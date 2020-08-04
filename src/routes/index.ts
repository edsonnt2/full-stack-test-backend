import { Router } from 'express';
import customersRoute from './customers.routes';

const routes = Router();

routes.use('/customers', customersRoute);

export default routes;
