import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CustomerControllers from '../controllers/CustomerControllers';

const customersRoute = Router();
const customerControllers = new CustomerControllers();

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
  '/:id',
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

customersRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().required(),
    },
  }),
  customerControllers.index,
);

export default customersRoute;
