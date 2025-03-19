import express, {RequestHandler} from 'express';

import {verifyToken} from '../utils/jwt.utils';
import {config} from '../config/config';

export const JwtMiddleware: RequestHandler = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        const token = authorization.split(' ')[1];

        if (token) {
            const payload = await verifyToken(token, config.JWT_SECRET!);

            /* @ts-ignore */
            req.user = payload;

            next();
        } else res.status(404).end('User unauthorized.');
    } else res.status(404).end('User unauthorized.');
};
