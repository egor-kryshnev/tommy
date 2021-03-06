import * as redis from 'redis';
import { promisify } from 'util';
import axios from 'axios';
import { AccessToken } from './access-token.interface';
import { config } from './config';
import { logger } from './logger-client';

export class AccessTokenService {

    private static client: redis.RedisClient = redis.createClient(config.redis.host);
    private static getAccessTokenRedis = promisify(AccessTokenService.client.get).bind(AccessTokenService.client);
    private static setAccessTokenRedis = promisify(AccessTokenService.client.set).bind(AccessTokenService.client);
    private static accessToken: AccessToken;

    public static async getAccessToken(): Promise<AccessToken> {
        if (!AccessTokenService.accessToken ||
            !this.isValidExpirationDate(AccessTokenService.accessToken.rest_access.expiration_date)) {
            const redisAccessToken = await this.getAccessTokenRedis('X-AccessKey');

            if (redisAccessToken &&
                this.isValidExpirationDate(JSON.parse(redisAccessToken).rest_access.expiration_date)) {
                logger({ message: "Access Key brought from redis", info: { redisAccessToken } });
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
                logger({ message: "Access Key brought from lehava api", info: { ...apiRes.data } });
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