import express from 'express';
import path from 'path';
import ws from 'ws';

import api from './api';
import logger from './logger';

import {wssHandler} from './wss';
import {config} from './config/config';

const app = express();

app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(express.json());

app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'index.html'));
});

async function start() {
    if (config.JWT_SECRET) {
        const wss = new ws.Server({port: 443});

        app.listen(config.PORT, async () => {
            logger.info(`Server has been started on port: ${config.PORT}.`);
        });

        wss.on('connection', wssHandler);
    } else {
        logger.error('No jwt secret provided.');
    }
}

start();
