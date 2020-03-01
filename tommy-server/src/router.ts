import { Router, Request, Response } from "express";

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: Request, res: Response) => { res.status(200).send('Server Is Up'); });
AppRouter.get('/user', (req: Request, res: Response) => { res.status(200).json(req.user); });

export { AppRouter };