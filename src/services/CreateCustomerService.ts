import ICustomerRepository from '../repositories/ICustomerRepository';
import { ICustomerModel } from '../database/schemas/Customer';

interface IResquest {
  fullName: string;
  cpf: number;
  birthday: string;
  contact: {
    phone: number;
    email: string;
  };
}

class CreateCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({
    fullName,
    cpf,
    birthday,
    contact: { email, phone },
  }: IResquest): Promise<ICustomerModel> {
    const hasEmailCustomer = await this.customerRepository.findByCustomer({
      where: 'email',
      find: email,
    });

    if (hasEmailCustomer)
      throw new Error('E-mail already registered for other customer');

    const hasCpfCustomer = await this.customerRepository.findByCustomer({
      where: 'cpf',
      find: String(cpf),
    });

    if (hasCpfCustomer)
      throw new Error('Cpf already registered for other customer');

    const hasPhoneCustomer = await this.customerRepository.findByCustomer({
      where: 'phone',
      find: String(phone),
    });

    if (hasPhoneCustomer)
      throw new Error('Phone already registered for other customer');

    const parsedBirthday = new Date(birthday);

    const customer = await this.customerRepository.create({
      fullName,
      birthday: parsedBirthday,
      cpf: String(cpf),
      contact: {
        email,
        phone: String(phone),
      },
    });
    return customer;
  }
}

export default CreateCustomerService;
