export const config = {
    rabbitmq: {
        url: process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
        queue_name: "log_queue"
    },
}