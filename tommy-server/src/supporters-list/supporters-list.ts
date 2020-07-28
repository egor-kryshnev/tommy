import * as redis from 'redis';
import { promisify } from 'util';
import axios from 'axios';
import { Supporter } from './supporter.interface';
import { config } from './config';
import { AccessTokenProvider } from '../access-token/access-token-service';
import { logger } from '../utils/logger-client';

export class SupportersList {

    private static client: redis.RedisClient = redis.createClient(config.redis.host);
    private static getRedis = promisify(SupportersList.client.get).bind(SupportersList.client);
    private static setRedis = promisify(SupportersList.client.set).bind(SupportersList.client);
    private static supportersList: string[];

    public static async getSupportersList() {

        if (!SupportersList.supportersList || ! await this.isValidExpirationDate()) {

            console.log("Pulling Supporters List from REDIS");
            const redisSupportersList = JSON.parse(await this.getRedis('Supporters-List'));
            
            if (redisSupportersList && await this.isValidExpirationDate()) {
                this.supportersList = redisSupportersList;
            } else {
                try {
                    console.log("Requesting LehavaAPI for supporters list");
                    const res = await axios(`http://${config.lehava_api.lehavaHostName}${config.lehava_api.requestUrl}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "X-AccessKey": await AccessTokenProvider.getAccessToken(),
                                "x-obj-attrs": "userid"
                            },
                            method: "GET"
                        });

                    const supportersListRes: Supporter[] = res.data.collection_cnt.cnt;

                    console.log(`Using access key: ${await AccessTokenProvider.getAccessToken()}`);

                    console.log(`Setting REDIS[Supporters-List]: ${supportersListRes}`);
                    await this.setRedis('Supporters-List', this.hichatUsersArrayBuild(supportersListRes, "userid"));

                    console.log(`Setting REDIS[Supporters-Exp-Date]: ${new Date().getTime() + 86400000}`);
                    await this.setRedis('Supporters-Exp-Date', `${new Date().getTime() + 86400000}`);

                    SupportersList.supportersList = JSON.parse(this.hichatUsersArrayBuild(supportersListRes, "userid"));
                } catch (err) {
                    logger(err)
                }
            }
        }
        return SupportersList.supportersList;
    }

    static async isValidExpirationDate() {
        const currentTime = new Date().getTime();
        const expDate = parseInt(await this.getRedis('Supporters-Exp-Date'));
        return expDate ? currentTime < expDate : false;
    }

    static hichatUsersArrayBuild(array: any[], key: string): string {
        return JSON.stringify(array.map((elem) => `${elem[key]}@aman`));
    }
}