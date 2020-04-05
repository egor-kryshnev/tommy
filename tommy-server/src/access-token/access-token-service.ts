import { AccessToken } from './access-token.interface';
import { GetAccessToken } from './access-token-client';

export class AccessTokenProvider {

    private static accessToken: AccessToken;

    public static async getAccessToken(): Promise<string> {
        if (!this.accessToken || this.accessToken.expiration_date - new Date().getMilliseconds() <= 0) {
            this.accessToken = await GetAccessToken();
        }
        return String(this.accessToken['access_key']);
    }
}