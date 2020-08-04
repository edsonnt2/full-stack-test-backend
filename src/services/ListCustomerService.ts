import ICustomerRepository from '../repositories/ICustomerRepository';
import { ICustomerModel } from '../database/schemas/Customer';

class ListCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute(): Promise<ICustomerModel[]> {
    const customers = await this.customerRepository.list();

    return customers;
  }
}

export default ListCustomerService;
