import express from 'express';

import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';

const api = express.Router();

api.use('/auth', AuthRoutes);
api.use('/users', UserRoutes);

export default api;
