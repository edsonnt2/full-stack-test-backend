import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CustomerControllers from '../controllers/CustomerControllers';
import SearchCustomerControllers from '../controllers/SearchCustomerControllers';

const customersRoute = Router();
const customerControllers = new CustomerControllers();
const searchCustomerControllers = new SearchCustomerControllers();

customersRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      cpf: Joi.number().required(),
      birthday: Joi.string().required(),
      contact: Joi.object().keys({
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
      }),
    },
  }),
  customerControllers.create,
);

customersRoute.get(
  '/find/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  customerControllers.show,
);

customersRoute.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      cpf: Joi.number().required(),
      birthday: Joi.string().required(),
      contact: Joi.object().keys({
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
      }),
    },
  }),
  customerControllers.update,
);

customersRoute.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  customerControllers.delete,
);

customersRoute.get('/', customerControllers.index);

customersRoute.get(
  '/search',
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().required(),
    },
  }),
  searchCustomerControllers.index,
);

export default customersRoute;
