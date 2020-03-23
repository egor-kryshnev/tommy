import amqp from 'amqplib/callback_api';
import { AccessToken } from './access-token.interface';
import { config } from './../config';

export const GetAccessToken = async (): Promise<AccessToken> => {
    return new Promise((res, rej) => {

        amqp.connect(config.rabbitmq.url, (error0, connection) => {
            if (error0) {
                rej(error0);
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    rej(error1);
                }
                channel.assertQueue('', {
                    exclusive: true
                }, (error2, q) => {
                    if (error2) {
                        rej(error2);
                    }
                    const correlationId = generateUuid();
                    console.log(' [x] Requesting Access Token');
                    channel.consume(q.queue, (msg) => {
                        if (msg && msg.properties.correlationId === correlationId) {
                            console.log(' [.] Got %s', msg.content.toString());
                            connection.close();
                            res(JSON.parse(msg.content.toString()));
                        }
                    }, {
                        noAck: true
                    });
                    channel.sendToQueue(config.rabbitmq.queue_name, Buffer.from('Get Access Token'), {
                        correlationId: correlationId,
                        replyTo: q.queue
                    });
                });
            });
        });
    });

}

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}