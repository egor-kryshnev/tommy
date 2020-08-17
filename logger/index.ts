import amqp from 'amqplib/callback_api';
import { logger } from './logger';
import { config } from './config';
import { Log } from './log.interface';

const urlKeys: string[] = config.urls.map((url) => String(Object.keys(url)[0]));
const urlValues: string[] = config.urls.map((url) => String(Object.values(url)[0]));

amqp.connect(config.rabbitmq.url, (error0: Error, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1: Error, channel) => {
        if (error1) {
            throw error1;
        }
        const queue = config.rabbitmq.queue_name;

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(' [x] Awaiting logs');
        channel.consume(queue, (msg) => {
            if (msg) {
                const log: Log = JSON.parse(msg.content.toString());
                if (log.level === "error") {
                    log.purpose = "Error";
                } else if (log.info && log.info.url) {
                    const searchUrl: string = log.info.url;
                    log.purpose = urlKeys[urlValues.findIndex((urlValue) => urlValue.includes(searchUrl))] || "Unknown";
                } else {
                    log.purpose = "Notify";
                }

                log.service = log.service ? log.service : "Service wasn't specified";
                logger[log.level === "error" ? "error" : "info"](log);

                channel.sendToQueue(msg.properties.replyTo,
                    Buffer.from('Success'), {
                    correlationId: msg.properties.correlationId
                });

                channel.ack(msg);
            }
        });
    });
});