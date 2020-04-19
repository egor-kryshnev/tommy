export const config = {
    lehava_api: {
        request: {
            url: process.env.LEHAVA_API_URL || "http://lehava-api-mock:8050/caisd-rest/rest_access",
        }
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
        queue_name: "access_token_rpc_queue"
    }
}