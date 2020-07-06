import express, { response } from "express";
import http from "http";
import bodyParser from "body-parser";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { LehavaRouter } from "./lehava.router";
import { HichatRouter } from "./hichat.router";
import {
  userErrorHandler,
  serverErrorHandler,
  unknownErrorHandler,
} from "./utils/errors/handler";
import { AuthenticationHandler } from "./authentication/handler";
import { AuthenticationRouter } from "./authentication/router";
import { AuthenticationMiddleware } from "./authentication/middleware";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import * as redis from "redis";
import connectRedis from "connect-redis";
import { logger } from "./utils/logger";
import axios, { Method } from "axios";
import amqp from "amqplib/callback_api";
import { promisify } from "util";
import { AccessTokenProvider } from "./access-token/access-token-service";
import { GetAccessToken } from "./access-token/access-token-client";

export class Server {
  public app: express.Application;
  private server: http.Server;
 

  public static bootstrap(): Server {
    return new Server();
  }

  private constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.initializeAuthenticator();
    this.app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      logger.info({
        method: req.method,
        url: req.url,
        query: req.query,
        headers: req.headers,
        body: req.body,
        user: req.user,
      });
      next();
    });
    this.app.use("/api", AuthenticationMiddleware.requireAuth, LehavaRouter);
    this.app.use("/hichat", AuthenticationMiddleware.requireAuth, HichatRouter);
    this.initializeErrorHandler();
    this.app.get(
      "/user",
      AuthenticationMiddleware.requireAuth,
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => res.send(req.user)
    );
    this.app.all(
      "/*",
      AuthenticationMiddleware.requireAuth,
      createProxyMiddleware({ target: config.client.url, changeOrigin: false })
    );
    this.server = http.createServer(this.app);
    this.server.listen(config.server.port, () => {
      logger.info(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } environment on port ${config.server.port}`
      );
    });
  }

  public close() {
    this.server.close();
  }

  private configureMiddlewares() {
    this.app.use(helmet());

    this.app.get("/isalive", function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.status(200).send("Server Is Up");
    });

    this.app.get("/health",(req: express.Request,res: express.Response,next: express.NextFunction) => {
        let healthCheck: string = '';
        const servicesArray: Array<{ serviceName: string; isAlive: boolean }>=[
            { serviceName: "Server", isAlive: true },
            { serviceName: "Client", isAlive: true },
            { serviceName: "RabbitMQ", isAlive: true },
            { serviceName: "Redis", isAlive: true },
            { serviceName: "Access Token", isAlive: true },
          ];
        const clientPromise = new Promise((resolve, reject) =>
        axios
        .get(`${config.client.url}/isaliveclient`)
        .then((response) =>
        resolve())
        .catch((err) => {reject(servicesArray[1].isAlive = false)})
        
        );

        const rabbitPromise = new Promise((resolve, reject)=>{
            amqp.connect(config.rabbitmq.url,(err, connection) => {
                  if (err) {
                      reject(servicesArray[2].isAlive = false)
                  }
                  else{
                    resolve()
                  }
                }
              );
        });

        const redisPromise = new Promise((resolve, reject)=>{

          if(redisClient.set('key', 'value')){
            resolve();
          }
          else{
            reject(servicesArray[3].isAlive = false)
          }
        });

        const accessTokenPromise = new Promise((resolve, reject)=>{
          AccessTokenProvider.getAccessToken().then(()=>{
            resolve();
          })
          .catch(()=>{
            reject(servicesArray[4].isAlive = false)
          })
            // AccessTokenProvider.getAccessToken().then(()=>{
            //   resolve();
            // })
            // .catch(()=>{
            //   reject(servicesArray[4].isAlive = false);
            // })
        });

       
       
        Promise.all([clientPromise, rabbitPromise, redisPromise, accessTokenPromise]).finally(()=>{
          console.log(AccessTokenProvider.getAccessToken());
            servicesArray.forEach((service) => {
                if (service.isAlive) {
                  healthCheck = `${healthCheck} ${service.serviceName} is up`;
                } else {
                  healthCheck = `${healthCheck} ${service.serviceName} is down`;
                }
              });
            
              res.send(healthCheck);}

        )

      }
    );

    this.app.use(cors());

    this.app.use(function (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type"
      );
      res.setHeader("Access-Control-Allow-Origin", "*");

      return next();
    });

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient(config.redis.host);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        secret: config.auth.secret,
        resave: false,
        saveUninitialized: true,
      })
    );

    this.app.set("trust proxy", true);

    this.app.all(
      "*",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.setHeader("Last-Modified", new Date().toUTCString());
        next();
      }
    );

    this.app.get(
      "/config",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(200).send(config.client.requests);
      }
    );
  }

  private initializeErrorHandler() {
    this.app.use(function (
      error: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      logger.error(error);
      next();
    });

    this.app.use(userErrorHandler);
    this.app.use(serverErrorHandler);
    this.app.use(unknownErrorHandler);
  }

  private initializeAuthenticator() {
    AuthenticationHandler.initialize(this.app);
    this.app.use("/auth/", AuthenticationRouter);
  }
}
