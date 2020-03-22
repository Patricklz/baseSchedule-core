import { Router } from 'express';
import Multer from 'multer';
import MulterConfig from './config/multer';

import UserController from './app/controllers/user-controller';
import SessionController from './app/controllers/session-controller';
import FileController from './app/controllers/file-controlles';

import AuthMiddleware from './app/middlewares/auth-middlewares';

const routes = new Router();
const upload = Multer(MulterConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
