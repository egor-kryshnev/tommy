import { Injectable } from '@angular/core';
import menash from 'menashmq';
import { config } from './../environments/config.dev';

@Injectable({
    providedIn: 'any'
})
export class LoggerService {
    constructor() { }

    async connect() {
        await menash.connect(config.rabbitmq.url);
        await menash.declareTopology({
            queues: [
                { name: config.rabbitmq.logger_queue_name }]
        });
    }
}