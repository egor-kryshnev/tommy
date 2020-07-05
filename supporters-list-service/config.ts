export const config = {
    lehava_api: {
        lehavaHostName: process.env.LEHAVA_HOST_NAME || "localhost:8050",
        requestUrl: process.env.SUPPORTERS_REQUEST_URL || "",
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
        queue_name: "supporters_rpc_queue"
    },
    redis: {
        host: process.env.REDIS_URL || 'redis://redis:6379'
    }
}