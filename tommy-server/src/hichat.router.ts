import { Router, Request, Response } from "express";
import { AuthorizationMiddleware } from "./authorization/middleware";
import { config } from './config';
import { Chat } from './chat/chat'

const HichatRouter: Router = Router();

// ADFS Middleware
HichatRouter.post('*', AuthorizationMiddleware.postAuthorization);

// Simple Url Response for client-side development
HichatRouter.get('/', async (req: Request, res: Response) => {
    const chat = new Chat();
    const user: any = req.user;
    const userT: string = user.adfsId.split("@")[0];
    const hitchatUserT: string = `${userT}@aman`;
    const groupName: string = chat.setGroupName(userT);

    //TODO: get support users from redis
    let groupUsersToAdd: string[] = (config.chat.supportUsers).slice(0);
    groupUsersToAdd.push(hitchatUserT);

    try {
        await chat.createGroup(groupName, groupUsersToAdd.concat([hitchatUserT]));
    } catch (err) {
        console.log(err);
    } finally {
        await chat.setRoomMembers(groupName, groupUsersToAdd);
        res.json({"url": `${config.chat.hiChatUrl}/${groupName}`});
        // TODO: pull support users from lehava and update in redis
    }

});


HichatRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));

export { HichatRouter };