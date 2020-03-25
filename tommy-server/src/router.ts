import { Router, Request, Response, NextFunction } from "express";
import axios from 'axios';
import { AccessTokenService } from './access-token/access-token-service';
import { AuthorizationMiddleware } from './authorization/middleware';

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
        apiHeaders['X-AccessKey'] = await AccessTokenService.getAccessToken();

        const apiRes = await axios({
            method: req.method,
            url: `http:/${req.url}`,
            params: req.params,
            headers: apiHeaders,
            data: req.body
        });

        res.status(apiRes.status).send(apiRes.data);
    } catch (e) {
        console.log('error')

        console.error(e.message);
        res.send(e.data);
    }
})

export { AppRouter };