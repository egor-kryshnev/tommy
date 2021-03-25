import MetadataCache from '../metadata-cache/metadataCache';
import { wrapController } from '../utils/index'
import LehavaDataController from './lehavaData.controller';
import moment from 'moment';
import { Router, Request, Response } from "express";
import { config } from '../config'
import { logger } from '../utils/logger-client';
import LehavaData from "./lehavaData";


const lehavaDataRouter: Router = Router();

lehavaDataRouter.get('/', wrapController(LehavaDataController.getData))

// Returns time difference between current time and dateToCompare in hours
const getTimeDifference = (dateToCompare: Date) => {
    const currentTime = moment();
    return currentTime.diff(dateToCompare, 'h')
}


LehavaDataRouter.get('/', async (req: Request, res: Response) => {
    const data = await MetadataCache.getRedis(config.redis.lehavaDataKey);
    const dataTime = await MetadataCache.getRedis(config.redis.lehavaDataStoredTimeKey);

    if (getTimeDifference(dataTime) > config.redis.lehavaDataTTL) {

    }
    if (!data) {
        const lehavaData = new LehavaData();
        try {
            const networksServicesAndCategories = await lehavaData.getAllData();
            const jsonData = JSON.stringify(networksServicesAndCategories);
            MetadataCache.setRedis(config.redis.lehavaDataKey, config.redis.cachedReqsTTL, jsonData);
            return res.status(200).send({ status: "success", data: jsonData });
        } catch (err) {
            console.log(err);
            logger(err);
            return res.status(400).send(err);
        }
    }
    res.status(200).send({ status: "success", data });

});

export default LehavaDataRouter;