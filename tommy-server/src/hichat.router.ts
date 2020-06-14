import { Router, Request, Response } from "express";
import { AuthorizationMiddleware } from "./authorization/middleware";
import { config } from './config';
import { Chat } from './chat/chat'

const HichatRouter: Router = Router();

// ADFS Middleware
HichatRouter.post('*', AuthorizationMiddleware.postAuthorization);

// Simple Url Response for client-side development
HichatRouter.get('/', (req: Request, res: Response) => {
    res.send({ url: 'https://www.ynet.co.il/Ext/App/TalkBack/CdaViewOpenTalkBack/0,11382,L-3190779-3,00.html' });
});

// LehavaRouter.get('/hichat', async (req: Request, res: Response) => {
// try {
//     let chat = new Chat();
//     let headers = await chat.getAuthHeaders();
//     console.log(headers);
// } catch (err) {
//     console.log(err);
// }
// res.send('ITS OKAY')
// });

HichatRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));

export { HichatRouter };