import * as redis from 'redis';
import { promisify } from 'util';
import axios from 'axios';
import { Supporter } from './supporter.interface';
import { config } from './config';

export class SupportersListService {

    private static client: redis.RedisClient = redis.createClient(config.redis.host);
    private static getRedis = promisify(SupportersListService.client.get).bind(SupportersListService.client);
    private static setRedis = promisify(SupportersListService.client.set).bind(SupportersListService.client);
    private static supportersList: String[];

    public static async getSupportersList(accessToken: number): Promise<String[]> {

        if (!SupportersListService.supportersList || ! await this.isValidExpirationDate()) {

            const redisSupportersList = (await this.getRedis('Supporters-List')).split(',');

            if (redisSupportersList && this.isValidExpirationDate) {
                console.log(`Supporters list brought from redis: ${redisSupportersList}`)
                this.supportersList = redisSupportersList;
            } else {
                const res = await axios(`${config.lehava_api.lehavaHostName}${config.lehava_api.requestUrl}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "X-AccessKey": accessToken
                        },
                        method: "GET"
                    });
                const supportersListRes: Supporter[] = res.data.collection_cnt.cnt;
                console.log(`Using access key: ${accessToken}`);
                console.log(`Setting REDIS[Supporters-List]: ${supportersListRes}`);
                await this.setRedis('Supporters-List', this.arrayBuildByKey(supportersListRes, "@COMMON_NAME"));
                console.log(`Setting REDIS[Supporters-Exp-Date]: ${new Date().getTime() + 86400000}`);
                await this.setRedis('Supporters-Exp-Date', `${new Date().getTime() + 86400000}`);
                SupportersListService.supportersList = this.arrayBuildByKey(supportersListRes, "@COMMON_NAME");
            }
        }
        return SupportersListService.supportersList;
    }

    static async isValidExpirationDate() {
        const currentTime = new Date().getTime();
        const expDate = parseInt(await this.getRedis('Supporters-Exp-Date'));
        return currentTime < expDate;
    }

    static arrayBuildByKey(array: any[], key: string) {
        return array.map((elem) => {
            return elem[key];
        });
    }
}