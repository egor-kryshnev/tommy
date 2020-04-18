import axios from 'axios';
import { AccessToken } from './access-token.interface';
import { config } from './config';

export class AccessTokenService {

    private static accessToken: AccessToken;

    public static async getAccessToken(): Promise<AccessToken> {
        if (!this.accessToken || this.accessToken.expiration_date - new Date().getMilliseconds() <= 0) {
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
            console.log(`Access Key brought from lehava api: ${JSON.stringify(apiRes.data)}`)
            this.accessToken = apiRes.data;
        }
        return this.accessToken;
    }
}