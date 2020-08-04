import ICustomerRepository from '../repositories/ICustomerRepository';
import { ICustomerModel } from '../database/schemas/Customer';

interface IResquest {
  id: string;
  fullName: string;
  cpf: number;
  birthday: string;
  contact: {
    phone: number;
    email: string;
  };
}

class EditCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({
    id,
    fullName,
    cpf,
    birthday,
    contact: { phone, email },
  }: IResquest): Promise<ICustomerModel> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new Error('Customer not found');

    Object.assign(customer, {
      fullName,
      cpf: String(cpf),
      birthday: new Date(birthday),
      contact: {
        email,
        phone: String(phone),
      },
    });

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default EditCustomerService;
