import { Router, Request, Response, NextFunction } from "express";
import axios from 'axios';
import { ServerError } from "./utils/errors/application";
import { NotPermittedError } from "./utils/errors/user";
import { AccessTokenService } from './access-token/access-token-service';


const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));

AppRouter.post('*', (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;

    try {
        if (user["id"] === req.body.cr.customer['@id']) {
            next();
        } else {
            throw new NotPermittedError;
        }
    } catch (err) {
        throw new NotPermittedError;
    }
});

AppRouter.all('*', (req: Request, res: Response) => {
    console.log(req.method, `http:/${req.url}`);
    axios({
        method: req.method,
        url: `http:/${req.url}`,
        params: req.params,
        headers: { ...req.headers, 'x-accesskey': AccessTokenService.getAccessToken() },
        data: req.body
    })
        .then((apiRes) => res.status(apiRes.status).send(apiRes.data))
        .catch((err: Error) => { throw new ServerError(err.message) });
})

export { AppRouter };