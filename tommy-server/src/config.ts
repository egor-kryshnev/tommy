process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any;

export const config = {
    server: {
        port: process.env.PORT || 80,
    },
    auth: {
        callbackURL: process.env.AUTH_CALLBACK_URL,
        shragaURL: process.env.SHRAGA_URL,
        useEnrichId: true,
        secret: 'ApPr0vaL_5ySt3m',
        daysExpires: 3,
    },
    client: {
        url: process.env.CLIENT_URL
    },
    serviceName: 'tommy-server',
    redis: {
        host: process.env.REDIS_URL || 'redis://localhost',
    },
    lehava_api: {
        request: {
            method: 'POST',
            url: process.env.LEHAVA_API_URL || "http://lehava-api-mock:8050/caisd-rest/rest_access",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Basic c2VydmljZWRlc2s6U0RBZG1pbjAx"
            }
        }
    }
}