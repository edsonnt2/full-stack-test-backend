import ICreateCustomerDTO from '../../Dtos/ICreateCustomerDTO';
import IFindByCustomerDTO from '../../Dtos/IFindByCustomerDTO';
import ICustomerRepository from '../../repositories/ICustomerRepository';
import { ICustomerModel, Customer } from '../schemas/Customer';

class CustomerRepository implements ICustomerRepository {
  public async create(data: ICreateCustomerDTO): Promise<ICustomerModel> {
    const customer = await Customer.create<ICustomerModel>({
      ...data,
      status: true,
    });

    return customer;
  }

  public async findByCustomer({
    where,
    find,
  }: IFindByCustomerDTO): Promise<ICustomerModel | undefined> {
    const newWhere = where === 'cpf' ? 'cpf' : `contact.${where}`;
    const customer = await Customer.findOne({
      [newWhere]: find,
    });

    return customer || undefined;
  }

  public async findById(id: string): Promise<ICustomerModel | undefined> {
    const customer = await Customer.findById(id);

    return customer || undefined;
  }

  public async list(): Promise<ICustomerModel[]> {
    const customers = await Customer.find();
    return customers;
  }

  public async search(search: string): Promise<ICustomerModel[]> {
    const newSearch = search.trim();
    const isNumber = search
      .split('')
      .filter(char => Number(char) || char === '0')
      .join('');

    const arrayOr: { [key: string]: { [key: string]: string | RegExp } }[] = [
      {
        fullName: {
          $regex: new RegExp(newSearch),
          $options: 'i',
        },
      },
      {
        'contact.email': {
          $regex: new RegExp(newSearch),
          $options: 'i',
        },
      },
    ];

    if (isNumber)
      arrayOr.push(
        {
          'contact.phone': {
            $regex: new RegExp(isNumber),
            $options: 'i',
          },
        },
        {
          cpf: {
            $regex: new RegExp(isNumber),
            $options: 'i',
          },
        },
      );
    const filterCustomers = await Customer.find({
      $or: arrayOr,
    });

    return filterCustomers;
  }

  public async save(customer: ICustomerModel): Promise<void> {
    await Customer.findOneAndUpdate(
      {
        _id: customer.id,
      },
      {
        $set: customer,
      },
      {
        new: true,
      },
    );
  }

  public async deleteById(id: string): Promise<void> {
    await Customer.deleteOne({
      _id: id,
    });
  }
}

export default CustomerRepository;
