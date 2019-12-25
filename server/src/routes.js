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

// Validators
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateRegistrationStore from './app/validators/RegistrationStore';
import validateRegistrationUpdate from './app/validators/RegistrationUpdate';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validateQuestionStore from './app/validators/QuestionsStore';
import validateAnswerStore from './app/validators/AnswerStore';
import validateLoginStudentIndex from './app/validators/LoginStudentIndex';
import validateIdParam from './app/validators/ValidateIdParam';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Gympoint' }));
routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post(
  '/login-students',
  validateLoginStudentIndex,
  LoginStudentController.index
);

routes.get('/students/:id/checkins', validateIdParam, CheckinController.index);
routes.post('/students/:id/checkins', validateIdParam, CheckinController.store);

routes.get(
  '/students/:id/help-orders',
  validateIdParam,
  QuestionsController.index
);
routes.post(
  '/students/:id/help-orders',
  validateQuestionStore,
  QuestionsController.store
);

routes.use(authMiddleware);

routes.get('/help-orders', AnswerController.index);
routes.post('/help-orders/:id', validateAnswerStore, AnswerController.store);

routes.get('/students', StudentController.index);
routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', validateStudentUpdate, StudentController.update);
routes.delete('/students/:id', validateIdParam, StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', validateIdParam, PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post(
  '/registrations',
  validateRegistrationStore,
  RegistrationController.store
);
routes.put(
  '/registrations/:id',
  validateRegistrationUpdate,
  RegistrationController.update
);
routes.delete(
  '/registrations/:id',
  validateIdParam,
  RegistrationController.delete
);

export default routes;
