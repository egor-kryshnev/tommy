import { Server } from './server';


process.on('uncaughtException', (err: Error) => {
    console.log('Unhandled Exception', err.message);
    process.exit(1);
});

(async () => {
    const server: Server = Server.bootstrap();

    server.app.on('close', () => {
        console.log('Server closed');
    });
})();
