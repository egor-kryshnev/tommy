import { Router, Request, Response } from "express";
import { AuthorizationMiddleware } from "./authorization/middleware";
import { AccessTokenProvider } from './access-token/access-token-service';
import axios, { Method } from 'axios';
import { IpMiddleware } from './utils/middlewares/ip-middleware';
import { ComputerNameMiddleware } from './utils/middlewares/computer-name-middleware';
import { config } from './config';

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));

AppRouter.post('*', AuthorizationMiddleware.postAuthorization, IpMiddleware, ComputerNameMiddleware);

AppRouter.all('*', async (req: Request, res: Response) => {
    const url = `http://${config.lehava_api.host}:${config.lehava_api.port}${req.url}`;
    console.log(req.method, url);
    try {
        const apiHeaders = { ...req.headers };
        apiHeaders['X-AccessKey'] = await AccessTokenProvider.getAccessToken();

        const apiRes = await axios({
            method: req.method as Method,
            url,
            params: req.params,
            headers: apiHeaders,
            data: req.body
        });

        res.status(apiRes.status).send(apiRes.data);
    } catch (e) {
        console.error(`error\n${e.message}`);
        res.send(e.message);
    }
})

export { AppRouter };