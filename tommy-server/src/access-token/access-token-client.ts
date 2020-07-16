import { config } from './../config';
import menash from 'menashmq';
import { logger } from '../utils/logger-client';

type PromiseObject = {
    promise: Promise<any>;
    resolve: (p: any) => void;
    reject: (p: any) => void;
};

const requests: { [key: string]: PromiseObject } = {};

export const createGetAccessTokenConsumer = () => {
    return menash.queues[config.rabbitmq.access_token_return_queue].activateConsumer((msg) => {
        const correlationId = msg.properties.correlationId;

        if (!requests[correlationId]) {
            return;
        }

        requests[correlationId].resolve(msg.getContent());
    });
};

export const GetAccessToken = async () => {
    const correlationId = generateCorrelationId();

    const promiseObject: Partial<PromiseObject> = {};

    promiseObject.promise = new Promise((resolve, reject) => {
        promiseObject.resolve = resolve;
        promiseObject.reject = reject;
    });

    requests[correlationId] = promiseObject as PromiseObject;

    await menash.send(config.rabbitmq.access_token_rpc_queue,
        'Get Access Token',
        { replyTo: config.rabbitmq.access_token_return_queue, correlationId });

    const result = await requests[correlationId].promise.catch(console.error);

    delete requests[correlationId];

    logger({ message: 'Got Access Token', info: result })
    return result;
};

const generateCorrelationId = () =>
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString();