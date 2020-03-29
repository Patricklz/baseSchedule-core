import { Router } from 'express';
import Multer from 'multer';
import MulterConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileControlles';
import ProviderController from './app/controllers/ProviderController';
import appointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import AuthMiddleware from './app/middlewares/auth-middlewares';
import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();
const upload = Multer(MulterConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', appointmentController.index);
routes.post('/appointments', appointmentController.store);
routes.delete('/appointments/:id', appointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
