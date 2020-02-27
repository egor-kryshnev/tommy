process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any;

export const config = {
    server: {
        port: process.env.PORT || 8080,
    },
    auth: {
        callbackURL: process.env.AUTH_CALLBACK_URL || 'http://localhost/auth/callback',
        shragaURL: process.env.SHRAGA_URL || "http://13.79.7.3",
        useEnrichId: true,
        secret: 'ApPr0vaL_5ySt3m',
        daysExpires: 3,
    },
    client: {
        url: process.env.CLIENT_URL || 'http://localhost:4200'
    },
    serviceName:'tommy-server',
}