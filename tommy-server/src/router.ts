import { Router, Request, Response, NextFunction } from "express";
import { AuthorizationMiddleware } from "./authorization/middleware";
import { AccessTokenProvider } from './access-token/access-token-service';
import { Proxy } from 'axios-express-proxy';

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));

AppRouter.post('*', AuthorizationMiddleware.postAuthorization, (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip.split(':')[3];
    req.body.cr.z_ipaddress = ip;
    console.log(ip);
    next();
});

AppRouter.all('*', async (req: Request, res: Response) => {
    console.log(req.method, `http:/${req.url}`);
    try {
        const apiHeaders = { ...req.headers };
        apiHeaders['X-AccessKey'] = await AccessTokenProvider.getAccessToken();
        req.headers = apiHeaders;

        Proxy(`http:/${req.url}`, req, res);
    } catch (e) {
        console.error(`error\n${e.message}`);
        res.send(e.data);
    }
})

export { AppRouter };