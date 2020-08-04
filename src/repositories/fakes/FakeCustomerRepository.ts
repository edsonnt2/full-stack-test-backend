import crypto from 'crypto';
import ICustomerRepository from '../ICustomerRepository';
import ICreateCustomerDTO from '../../Dtos/ICreateCustomerDTO';
import IFindByCustomerDTO from '../../Dtos/IFindByCustomerDTO';
import { ICustomerModel } from '../../database/schemas/Customer';

class FakeCustomerRepository implements ICustomerRepository {
  private customers: ICustomerModel[] = [];

  public async create(data: ICreateCustomerDTO): Promise<ICustomerModel> {
    const id = crypto.randomBytes(6).toString('hex');
    const customer: ICustomerModel = {} as ICustomerModel;

    Object.assign(customer, { id, status: true }, data);

    this.customers.push(customer);

    return customer;
  }

  public async findByCustomer({
    where,
    find,
  }: IFindByCustomerDTO): Promise<ICustomerModel | undefined> {
    const customer = this.customers.find(({ contact, cpf }) =>
      where === 'cpf' ? cpf === find : contact[where] === find,
    );

    return customer;
  }

  public async findById(id: string): Promise<ICustomerModel | undefined> {
    return this.customers.find(findCustomer => findCustomer.id === id);
  }

  public async search(search: string): Promise<ICustomerModel[]> {
    const newSearch = search.trim();
    const filterCustomers = this.customers.filter(({ fullName }) =>
      fullName.includes(newSearch),
    );

    return filterCustomers;
  }

  public async save(customer: ICustomerModel): Promise<void> {
    const findIndexCustomer = this.customers.findIndex(
      ({ id }) => id === customer.id,
    );

    this.customers[findIndexCustomer] = customer;
  }

  public async deleteById(id: string): Promise<void> {
    this.customers.filter(filterCustomer => filterCustomer.id !== id);
  }
}

export default FakeCustomerRepository;
