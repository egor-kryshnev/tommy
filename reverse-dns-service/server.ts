import amqp from 'amqplib/callback_api';
import { config } from './config';
import dns from 'dns';

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
            durable: false
        });
        channel.prefetch(1);
        console.log(' [x] Awaiting RPC requests for reverse dns service');
        channel.consume(queue, async (msg) => {
            if (msg) {
                const computerName = await getComputerName(msg.content.toString());

                channel.sendToQueue(msg.properties.replyTo,
                    Buffer.from(computerName), {
                    correlationId: msg.properties.correlationId
                });

                channel.ack(msg);
            }
        });
    });
});

async function getComputerName(ip: string): Promise<string> {
    return new Promise((resolve, reject) =>
        dns.reverse(ip, (err: Error | null, hostnames: string[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(hostnames[0]);
            }
        })
    );
}