import { AccessToken } from './access-token.interface';
import { GetAccessToken } from './access-token-client';

export class AccessTokenProvider {

    private static accessToken: AccessToken;

    public static async getAccessToken(): Promise<string> {
        if (!AccessTokenProvider.accessToken ||
            (AccessTokenProvider.accessToken.rest_access.expiration_date - (new Date().getTime() / 1000) <= 100)) {
            this.accessToken = await GetAccessToken();
        }
        return String(AccessTokenProvider.accessToken.rest_access.access_key);
    }
}