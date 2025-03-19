import express from 'express';

import UserController from '../controllers/user.controller';
import {JwtMiddleware} from '../middlewares/jwt.middleware';

const api = express.Router();

api.use(JwtMiddleware);

api.get('/', UserController.getAll);
api.get('/:id', UserController.getOne);

export default api;
