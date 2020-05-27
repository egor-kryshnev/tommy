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
        chatUrl: process.env.CHAT_URL || 'http://localhost:8080',
        hiChatUrl: process.env.HI_CHAT_URL || 'http://localhost:8080',
        chatGroupUrl: process.env.CHAT_GROUP_URL || 'groups',
        chatLoginUrl: process.env.CHAT_LOGIN_URL || 'login',
        chatMessageUrl: process.env.CHAT_MESSAGE_URL || 'chat',
        loginUser: process.env.LOGIN_USER || 'user',
        loginPass: process.env.LOGIN_PASS || 'pass'
    }
}