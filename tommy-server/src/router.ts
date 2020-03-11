import { Router, Request, Response } from "express";
import axios from 'axios';
import { ServerError } from "./utils/errors/application";

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));
AppRouter.all('*', (req: Request, res: Response) => {
    console.log(req.method, `http:/${req.url}`);
    axios({
        method: req.method,
        url: `http:/${req.url}`,
        params: req.params,
        data: req.body
    })
    .then((apiRes) => res.status(apiRes.status).send(apiRes.data))
    .catch((err: Error) => { throw new ServerError(err.message) });
})

export { AppRouter };