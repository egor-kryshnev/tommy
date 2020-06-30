import { Router, Request, Response } from "express";
import { AuthorizationMiddleware } from "./authorization/middleware";
import { config } from './config';
import { Chat } from './chat/chat'

const HichatRouter: Router = Router();

HichatRouter.post('/sendmsg', async (req: Request, res: Response) => {
    const chat = new Chat();
    const groupName = getGroupName(req.user);
    const request = req.body;
    const messageToSend = `Request title: ${request.taskSummary}, request id: ${request.taskId}, opened in: ${request.taskDate}`;
    try {
        await chat.sendMessageToGroup(groupName, messageToSend);
        res.status(200).send(`Message ${messageToSend} sent to group ${groupName}`);
    } catch (err) {
        console.error(err);
        res.status(300).send(err);
    }
});


// Simple Url Response for client-side development
HichatRouter.get('/', async (req: Request, res: Response) => {
    const chat = new Chat();
    const user: any = req.user;
    const userT: string = user.adfsId.split("@")[0];
    const hitchatUserT: string = `${userT}@aman`;
    const groupName: string = chat.setGroupName(userT);

    //TODO: get support users from redis
    let groupUsersToAdd: string[] = (config.chat.supportUsers).slice(0);
    const tommyUser = "tommy";
    // groupUsersToAdd.push(hitchatUserT);

    try {
        await chat.createGroup(groupName, groupUsersToAdd.concat([hitchatUserT, tommyUser]));
    } catch (err) {
        console.log(err);
    } finally {
        await chat.setRoomMembers(groupName, groupUsersToAdd);
        res.json({ "url": `${config.chat.hiChatUrl}/${groupName}` })
        // TODO: pull support users from lehava and update in redis
    }
});

function getGroupName(user: any) {
    const chat: Chat = new Chat();
    const userT: string = user.adfsId.split("@")[0];
    const hitchatUserT: string = `${userT}@aman`;
    const groupName: string = chat.setGroupName(userT);
    return groupName;
}


HichatRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));


export { HichatRouter };