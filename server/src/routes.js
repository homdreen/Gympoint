import { Router } from 'express';

import authMiddleware from './app/middlewares/Auth';

import CheckinController from './app/controllers/CheckinController';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import QuestionsController from './app/controllers/QuestionsController';
import AnswerController from './app/controllers/AnswerController';
import LoginStudentController from './app/controllers/LoginStudentController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Gympoint' }));
routes.post('/sessions', SessionController.store);

routes.post('/login-students', LoginStudentController.index);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', QuestionsController.index);
routes.post('/students/:id/help-orders', QuestionsController.store);

routes.use(authMiddleware);

routes.get('/help-orders', AnswerController.index);
routes.post('/help-orders/:id', AnswerController.store);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
