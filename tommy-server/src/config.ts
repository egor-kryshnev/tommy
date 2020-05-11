process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 as any;

export const config = {
    server: {
        port: process.env.PORT || 80,
    },
    auth: {
        callbackURL: process.env.AUTH_CALLBACK_URL || "/auth/callback",
        shragaURL: process.env.SHRAGA_URL || 'http://13.79.7.3',
        useEnrichId: true,
        secret: 'ApPr0vaL_5ySt3m',
        daysExpires: 3,
    },
    client: {
        url: process.env.CLIENT_URL || "http://localhost:4200"
    },
    serviceName: 'tommy-server',
    redis: {
        host: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    lehava_api: {
        host: process.env.LEHAVA_API_HOST || "lehava-api-mock",
        port: process.env.LEHAVA_API_PORT || "8050"
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
        access_token_queue_name: "access_token_rpc_queue",
    },

    chat: {
        chatUrl: process.env.chatUrl || 'http://localhost:8080',
        chatGroupUrl: process.env.chatGroupUrl || 'group',
        chatLoginUrl: process.env.chatLoginUrl || 'login',
        chatMessageUrl: process.env.chatMessageUrl || 'chat',
        loginUser: process.env.loginUser || 'user',
        loginPass: process.env.loginPass || 'pass'
    }
}