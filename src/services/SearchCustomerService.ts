import ICustomerRepository from '../repositories/ICustomerRepository';
import { ICustomerModel } from '../database/schemas/Customer';

interface IResquest {
  search: string;
}

class SearchCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({ search }: IResquest): Promise<ICustomerModel[]> {
    const customers = await this.customerRepository.search(search);

    return customers;
  }
}

export default SearchCustomerService;
