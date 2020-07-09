import * as express from 'express';
import { ServerError, UserError, RabbitmqError } from './application';

export function userErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof UserError) {
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });
        next();
    } else {
        next(error);
    }
}

export function serverErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof ServerError) {
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function rabbitmqErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof RabbitmqError) {
        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function unknownErrorHandler(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(error && error.status ? error.status : 500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
