import { Router, Request, Response } from "express";
import { config } from './config';
import { Chat } from './chat/chat'
import { SupportersList } from './supporters-list/supporters-list';
import { logger } from './utils/logger-client';

const HichatRouter: Router = Router();

HichatRouter.post('/sendmsg', async (req: Request, res: Response) => {
    const chat = new Chat();
    const groupName = getGroupName(req.user);
    const messageToSend = config.chat.hiChatTaskMessageStructure(req.body.taskId, req.body.taskDate, req.body.taskLink);
    console.log(messageToSend);
    try {
        await chat.sendMessageToGroup(groupName, messageToSend);
        res.status(200).send({ status: "success" });
    } catch (err) {
        logger(err);
        res.status(300).send(err);
    }
});


HichatRouter.get('/', async (req: Request, res: Response) => {
    const chat = new Chat();
    const user: any = req.user;
    const userT: string = user.adfsId.split("@")[0];
    const hitchatUserT: string = `${userT}@aman`;
    const groupName: string = chat.getAllowedGroupName(userT);

    //TODO: get support users from redis
    const groupUsersToAdd: string[] = (await config.chat.getSupportUsers()).concat(hitchatUserT);
    try {
        await chat.createGroup(groupName, groupUsersToAdd);
    } catch (err) {
        logger(err);
    } finally {
        try {
            await chat.setRoomMembers(groupName, groupUsersToAdd);
        } catch (err) {
            logger(err);
        }
        await chat.setRoomMembers(groupName, groupUsersToAdd);
        res.json({ "url": `${config.chat.hiChatUrl}/${groupName}` });
        // TODO: pull support users from lehava and update in redis
    }
});

function getGroupName(user: any) {
    const chat: Chat = new Chat();
    const userT: string = user.adfsId.split("@")[0];
    return chat.getAllowedGroupName(userT);
}


HichatRouter.get('/isalive', (req: Request, res: Response) => res.status(200).send('Server Is Up'));


export { HichatRouter };