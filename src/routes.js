import { Router } from 'express';

import UserController from './app/controllers/user-controller';
import SessionController from './app/controllers/session-controller';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;
