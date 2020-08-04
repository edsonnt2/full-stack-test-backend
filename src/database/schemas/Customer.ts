import { Schema, model, Document } from 'mongoose';

export interface ICustomerModel extends Document {
  fullName: string;
  cpf: string;
  birthday: Date;
  contact: {
    phone: string;
    email: string;
  };
  status: boolean;
}

export const Customer = model<ICustomerModel>(
  'customers',
  new Schema({
    fullName: String,
    cpf: String,
    birthday: Date,
    contact: {
      phone: String,
      email: String,
    },
    status: Boolean,
  }),
);
