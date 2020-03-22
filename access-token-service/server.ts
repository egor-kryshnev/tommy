import amqp from 'amqplib/callback_api';
import { AccessTokenService } from './access-token-service';
import { config } from './config';

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
    console.log(' [x] Awaiting RPC requests');
    channel.consume(queue, async (msg) => {
      if (msg) {
        const responseMsg = await AccessTokenService.getAccessToken();
        
        channel.sendToQueue(msg.properties.replyTo,
          Buffer.from(responseMsg), {
            correlationId: msg.properties.correlationId
          });
          
        channel.ack(msg);
      }
    });
  });
});