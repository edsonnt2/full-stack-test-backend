import ICreateCustomerDTO from '../Dtos/ICreateCustomerDTO';
import IFindByCustomerDTO from '../Dtos/IFindByCustomerDTO';
import { ICustomerModel } from '../database/schemas/Customer';

export default interface ICustomerRepository {
  create({
    fullName,
    cpf,
    birthday,
    contact,
  }: ICreateCustomerDTO): Promise<ICustomerModel>;
  findByCustomer({
    where,
    find,
  }: IFindByCustomerDTO): Promise<ICustomerModel | undefined>;
  findById(id: string): Promise<ICustomerModel | undefined>;
  list(): Promise<ICustomerModel[]>;
  save(customer: ICustomerModel): Promise<void>;
  deleteById(id: string): Promise<void>;
  search(search: string): Promise<ICustomerModel[]>;
}
