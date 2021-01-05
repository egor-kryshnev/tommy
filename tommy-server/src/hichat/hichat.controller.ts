import HichatManager from './hichat.manager'
import { config } from '../config'
import express from 'express'
import IShragaRequest from '../utils/shragaUser.interface'
export default class HichatController {

    createGroup = async (req: IShragaRequest, res: express.Response) => {
        
        
        
        return HichatManager.createGroupForUser(req.user.adfsId, await config.chat.getSupportUsers());
    }

}