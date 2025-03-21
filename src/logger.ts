import winston from 'winston';

const {combine, timestamp, json} = winston.format;

export const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp({format: 'DD-MM-YYYY hh:mm:ss A'}), json()),
    transports: [
        new winston.transports.File({
            filename: 'combined.log',
            dirname: './logs',
        }),
        new winston.transports.File({
            filename: 'error.log',
            dirname: './logs',
            level: 'error',
        }),
    ],
});

if (process.env.NODE_ENV == 'production') {
    logger.add(new winston.transports.Console());
}

export default logger;
