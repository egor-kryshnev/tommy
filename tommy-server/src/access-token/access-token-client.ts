import amqp from 'amqplib/callback_api';
import { AccessToken } from './access-token.interface';
import { config } from './../config';

export const GetAccessToken = async (): Promise<AccessToken> => {
    amqp.connect(config.rabbitmq.url, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(config.rabbitmq.queue_name, {
                exclusive: true
            }, (error2, q) => {
                if (error2) {
                    throw error2;
                }
                const correlationId = generateUuid();

                console.log(' [x] Requesting Access Token');

                channel.consume(q.queue, (msg) => {
                    if (msg && msg.properties.correlationId === correlationId) {
                        console.log(' [.] Got %s', msg.content.toString());
                        connection.close();
                        return JSON.parse(msg.content.toString());
                    }
                }, {
                    noAck: true
                });

                channel.sendToQueue(q.queue,
                    Buffer.from('Get Access Token'), {
                    correlationId: correlationId,
                    replyTo: q.queue
                });
            });
        });
    });
    return {} as AccessToken;
}

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}