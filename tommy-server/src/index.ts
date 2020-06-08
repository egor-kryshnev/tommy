import { Server } from './server';
import { logger } from './utils/logger';


process.on('uncaughtException', (err: Error) => {
    logger.error(err);
});

(async () => {
    const server: Server = Server.bootstrap();

    server.app.on('close', () => {
        logger.info('Server closed');
    });
})();
