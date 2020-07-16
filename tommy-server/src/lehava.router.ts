import { Router, Request, Response } from "express";
import { AuthorizationMiddleware } from "./authorization/middleware";
import { AccessTokenProvider } from './access-token/access-token-service';
import axios, { Method } from 'axios';
import { IpMiddleware } from './utils/middlewares/ip-middleware';
import { config } from './config';
import { logger } from './utils/logger-client';

const LehavaRouter: Router = Router();

LehavaRouter.post('*', AuthorizationMiddleware.postAuthorization, IpMiddleware);

LehavaRouter.all('*', async (req: Request, res: Response) => {
    const url = `http://${config.lehava_api.host}:${config.lehava_api.port}${req.url}`;
    try {
        const apiHeaders = { ...req.headers };
        apiHeaders['X-AccessKey'] = await AccessTokenProvider.getAccessToken();
        logger({
            message: `Proxying to ${url}`, info: {
                method: req.method as Method,
                url,
                params: req.params,
                headers: apiHeaders,
                data: req.body
            }
        });

        const apiRes = await axios({
            method: req.method as Method,
            url,
            params: req.params,
            headers: apiHeaders,
            data: req.body
        });

        res.status(apiRes.status).send(apiRes.data);
    } catch (e) {
        logger(e);
        res.send(e.message);
    }
})

export { LehavaRouter };