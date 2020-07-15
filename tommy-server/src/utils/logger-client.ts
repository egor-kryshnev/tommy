import { config } from '../config';
import menash from 'menashmq';

export const logger = async (log: Error | ({ message: string; info?: { [key: string]: any; } })): Promise<void> => {
    const sendLog: any = {
        level: (log instanceof Error) ? "error" : "info",
        service: config.serviceName,
        message: log.message,
        info: (log instanceof Error) ? log : log.info,
    };

    try {
        await menash.send(config.rabbitmq.logger_queue_name, sendLog);
    } catch (err) {
        console.error(err);
    }
}