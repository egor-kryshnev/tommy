import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        // - Write to all logs with level `info` and below to `info.log`.
        // - Write all logs error (and below) to `error.log`.
        new transports.File({ filename: './logs/error.log', level: 'error', maxsize: 5242880 }),
        new transports.File({ filename: './logs/info.log', maxsize: 5242880 })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.json()
        )
    }));
}
