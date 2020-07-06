import * as redis from 'redis';
import { promisify } from 'util';
import axios from 'axios';
import { SupporterI } from './supporter.interface';
import { config } from './config';

export class SupportersListService {

    private static client: redis.RedisClient = redis.createClient(config.redis.host);
    private static getAccessTokenRedis = promisify(SupportersListService.client.get).bind(SupportersListService.client);
    private static setAccessTokenRedis = promisify(SupportersListService.client.set).bind(SupportersListService.client);
    private static accessToken: ;

    public static async getAccessToken(): Promise<AccessToken> {
        if (!AccessTokenService.accessToken ||
            !this.isValidExpirationDate(AccessTokenService.accessToken.rest_access.expiration_date)) {
            const redisAccessToken = await this.getAccessTokenRedis('X-AccessKey');

            if (redisAccessToken &&
                this.isValidExpirationDate(JSON.parse(redisAccessToken).rest_access.expiration_date)) {
                console.log(`Access Key brought from redis: ${redisAccessToken}`)
                this.accessToken = JSON.parse(redisAccessToken);
            } else {
                const apiRes = await axios(config.lehava_api.request.url,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Basic c2VydmljZWRlc2s6U0RBZG1pbjAx"
                        },
                        method: "POST",
                        data: {
                            rest_access: "rest_access",
                        },
                    });
                console.log(`Access Key brought from lehava api: ${JSON.stringify(apiRes.data)}`);
                await this.setAccessTokenRedis('X-AccessKey', JSON.stringify(apiRes.data));
                AccessTokenService.accessToken = apiRes.data;
            }
        }
        return AccessTokenService.accessToken;
    }

    private static isValidExpirationDate(dateInSeconds: number): boolean {
        return dateInSeconds - (new Date().getTime() / 1000) > 100;
    }
}