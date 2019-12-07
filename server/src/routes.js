import { Router } from 'express';

import authMiddleware from './app/middlewares/Auth';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Gympoint' }));
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

export default routes;
