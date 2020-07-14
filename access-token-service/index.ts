import { AccessTokenService } from './access-token-service';
import { config } from './config';
import menashmq from 'menashmq';

(async () => {
  await menashmq.connect(config.rabbitmq.url);
  await menashmq.declareTopology({
    queues: [
      { name: config.rabbitmq.access_token_return_queue },
      { name: config.rabbitmq.access_token_rpc_queue }]
  });
  console.log(' [x] Awaiting RPC requests for access token service');
  await menashmq.queues[config.rabbitmq.access_token_rpc_queue].activateConsumer(async (msg) => {
    const accessToken = await AccessTokenService.getAccessToken();
    const correlationId = msg.properties.correlationId;
    await menashmq.send(config.rabbitmq.access_token_return_queue, accessToken, { correlationId });
  });
})();