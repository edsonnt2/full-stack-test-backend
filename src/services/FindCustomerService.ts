import ICustomerRepository from '../repositories/ICustomerRepository';
import { ICustomerModel } from '../database/schemas/Customer';

interface IResquest {
  id: string;
}

class FindCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({ id }: IResquest): Promise<ICustomerModel> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new Error('Customer not found');

    return customer;
  }
}

export default FindCustomerService;
