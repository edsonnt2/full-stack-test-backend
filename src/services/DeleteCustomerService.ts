import ICustomerRepository from '../repositories/ICustomerRepository';

interface IResquest {
  id: string;
}

class DeleteCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({ id }: IResquest): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) throw new Error('Customer not found');

    await this.customerRepository.deleteById(id);
  }
}

export default DeleteCustomerService;
