import * as redis from 'redis';
import { promisify } from 'util';
import axios from 'axios';
import { AccessToken } from './access-token';
import { config } from './../config';
import { ServerError } from '../utils/errors/application';

export class AccessTokenService {

    private static client: redis.RedisClient = redis.createClient(config.redis.host);
    private static getAccessTokenRedis = promisify(AccessTokenService.client.get).bind(AccessTokenService.client);
    private static setAccessTokenRedis = promisify(AccessTokenService.client.set).bind(AccessTokenService.client);
    private static accessToken: AccessToken;

    public static async getAccessToken(): Promise<string> {
        if (!this.accessToken || this.accessToken.expiration_date - new Date().getMilliseconds() <= 0) {
            const redisAccessToken = await this.getAccessTokenRedis('x-accesskey');

            if (redisAccessToken) {
                console.log(`Access Key brought from redis: ${redisAccessToken}`)
                this.accessToken = JSON.parse(redisAccessToken);
            } else {
                axios(config.lehava_api.request)
                    .then(async (apiRes) => {
                        console.log(`Access Key brought from lehava api: ${redisAccessToken}`)
                        this.accessToken = apiRes.data;
                        await this.setAccessTokenRedis('x-accesskey', JSON.stringify(apiRes.data));
                    })
                    .catch((err: Error) => {
                        throw new ServerError(err.message);
                    });
            }
        }
        return this.accessToken['@id'];
    }
}