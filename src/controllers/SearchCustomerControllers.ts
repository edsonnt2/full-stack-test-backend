import { Response, Request } from 'express';
import CustomerRepository from '../database/repositories/CustomerRepository';
import SearchCustomerService from '../services/SearchCustomerService';

export default class SearchCustomerControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const { search } = req.query;

    const customerRepository = new CustomerRepository();
    const searchCustomerService = new SearchCustomerService(customerRepository);

    try {
      const customers = await searchCustomerService.execute({
        search: String(search),
      });

      return res.json(customers);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}
