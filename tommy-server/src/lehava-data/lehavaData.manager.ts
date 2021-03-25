import { config } from "../config";
import { logger } from '../utils/logger-client';
import MetadataCache from "../metadata-cache/metadataCache";
import { LehavaDataError } from '../utils/errors/application'
import LehavaData from "./lehavaData";

export class LehavaDataManager {
    static async getData() {
        const data = await MetadataCache.getRedis(config.redis.lehavaDataKey);
        if (data) return data;
        const lehavaData = new LehavaData();
        try {
            const networksServicesAndCategories = await lehavaData.getAllData();
            const jsonData = JSON.stringify(networksServicesAndCategories);
            await MetadataCache.setRedis(config.redis.lehavaDataKey, config.redis.cachedReqsTTL, jsonData);
            return jsonData;
        } catch (err) {
            logger(err);
            console.log(err);
            throw new LehavaDataError(err,)
        }
    }
}

export default LehavaDataManager;
