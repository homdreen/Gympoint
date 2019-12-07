import { Router } from 'express';

import authMiddleware from './app/middlewares/Auth';

import SessionController from './app/controllers/AuthController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Gympoint' }));
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', (req, res) => {
  return res.send('aa');
});

export default routes;
