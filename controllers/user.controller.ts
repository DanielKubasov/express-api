import express from 'express';

class UserController {
    getAll(req: express.Request, res: express.Response): void {
        res.json([]);
    }

    getOne(req: express.Request, res: express.Response): void {
        res.json([]);
    }
}

export default new UserController();
