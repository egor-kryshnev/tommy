export const config = {
    lehava_api: {
        request: {
            url: process.env.LEHAVA_API_URL || "http://lehava-api-mock:8050/caisd-rest/rest_access",
        }
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
        access_token_return_queue: "access_token_return",
        access_token_rpc_queue: "access_token_rpc",
    },
    redis: {
        host: process.env.REDIS_URL || 'redis://redis:6379',
    },
}