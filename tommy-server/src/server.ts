import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { AppRouter } from './router';
import { errorHandler } from './utils/errors/handler';
import { AuthenticationHandler } from './authentication/handler';
import { AuthenticationRouter } from './authentication/router';
import { AuthenticationMiddleware } from './authentication/middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import * as redis from 'redis';
import connectRedis from 'connect-redis';

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
        this.app.use('/api', AuthenticationMiddleware.requireAuth, AppRouter);
        this.initializeErrorHandler();
        console.log(config.client.url);
        this.app.get('/user', AuthenticationMiddleware.requireAuth, (req: express.Request, res: express.Response, next: express.NextFunction) => res.send(req.user));
        this.app.all('/*', AuthenticationMiddleware.requireAuth, createProxyMiddleware({ target: config.client.url, changeOrigin: false }));
        this.server = http.createServer(this.app);
        this.server.listen(config.server.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} environment on port ${config.server.port}`)
        });
    }

    public close() {
        this.server.close();
    }

    private configureMiddlewares() {
        this.app.use(helmet());
        // this.app.disable('etag');

        this.app.get('/isalive', function (req: express.Request, res: express.Response, next: express.NextFunction) {
            res.status(200).send('Server Is Up');
        });

        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');
            res.setHeader("Access-Control-Allow-Origin", '*');

            return next();
        });

        this.app.use(cors());

        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
        }

        const RedisStore = connectRedis(session);
        const redisClient = redis.createClient(config.redis.host);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(session({
            store: new RedisStore({ client: redisClient }),
            secret: config.auth.secret,
            resave: false,
            saveUninitialized: true
        }));
    }

    private initializeErrorHandler() {
        this.app.use(errorHandler);
    }

    private initializeAuthenticator() {
        AuthenticationHandler.initialize(this.app);
        this.app.use('/auth/', AuthenticationRouter);
    }
}
