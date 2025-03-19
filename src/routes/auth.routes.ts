import express from 'express';

import AuthController from '../controllers/auth.controller';

const api = express.Router();

api.post('/sign-in', AuthController.signIn);
api.post('/sign-up', AuthController.signUp);

export default api;
