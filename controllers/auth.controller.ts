import express from 'express';

import sha256 from 'crypto-js/sha256';

import logger from '../logger';
import Pool from '../database/database';

import {config} from '../config/config';
import {signToken} from '../utils/jwt.utils';

import {SignInDTO, SignUpDTO} from '../dtos/auth.dto';

import {UserDTO} from '../dtos/user.dto';

class AuthController {
    async signIn(req: express.Request, res: express.Response): Promise<void> {
        const body = req.body as SignInDTO;

        if (!body.username) {
            res.status(401).end('No username provided.');
            return;
        }

        if (!body.password) {
            res.status(401).end('No password provided.');
            return;
        }

        const query = 'SELECT * FROM users WHERE username = $1;';
        const result = await Pool.query<UserDTO>(query, [body.username]);
        const user = result.rows[0];

        if (!user) {
            res.status(404).end('User with this username not found.');
            return;
        }

        const hash = sha256(body.password).toString();

        if (user.password !== hash) {
            res.status(401).end('Incorrect password.');
            return;
        }

        const access_token = await signToken({id: user.id}, config.JWT_SECRET!);

        res.json({
            user,
            access_token,
        });
    }

    async signUp(req: express.Request, res: express.Response): Promise<void> {
        const body = req.body as SignUpDTO;

        if (!body.username) {
            res.status(401).end('No username provided.');
            return;
        }

        if (!body.password) {
            res.status(401).end('No password provided.');
            return;
        }

        const hash = sha256(body.password).toString();

        const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;';
        const values = [body.username, hash];
        const result = await Pool.query(query, values);
        const user = result.rows[0];

        const access_token = await signToken({id: user.id}, config.JWT_SECRET!);

        res.json({
            user,
            access_token,
        });
    }
}

export default new AuthController();
