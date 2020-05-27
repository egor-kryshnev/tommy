import * as redis from 'redis';
import { promisify } from 'util';
import axios from 'axios';
import { AccessToken } from './access-token.interface';
import { config } from './config';

export class AccessTokenService {

    private static client: redis.RedisClient = redis.createClient(config.redis.host);
    private static getAccessTokenRedis = promisify(AccessTokenService.client.get).bind(AccessTokenService.client);
    private static setAccessTokenRedis = promisify(AccessTokenService.client.set).bind(AccessTokenService.client);
    private static accessToken: AccessToken;

    public static async getAccessToken(): Promise<AccessToken> {
        if (!AccessTokenService.accessToken ||
            (AccessTokenService.accessToken.rest_access.expiration_date - (new Date().getTime() / 1000) <= 0)) {
            const redisAccessToken = await this.getAccessTokenRedis('X-AccessKey');

            if (redisAccessToken) {
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
}