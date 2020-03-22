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

    public static async getAccessToken(): Promise<string> {
        if (!this.accessToken || this.accessToken.expiration_date - new Date().getMilliseconds() <= 0) {
            const redisAccessToken = await this.getAccessTokenRedis('X-AccessKey');

            if (redisAccessToken) {
                console.log(`Access Key brought from redis: ${redisAccessToken}`)
                this.accessToken = JSON.parse(redisAccessToken);
            } else {
                const apiRes = await axios(config.lehava_api.request.url,
                    { headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Basic c2VydmljZWRlc2s6U0RBZG1pbjAx"
                }, method: "POST" });
                console.log(`Access Key brought from lehava api: ${redisAccessToken}`)
                this.accessToken = apiRes.data;
                await this.setAccessTokenRedis('X-AccessKey', JSON.stringify(apiRes.data));
            }
        }
        return String(this.accessToken['access_key']);
    }
}