import { Response, Request } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import CustomerRepository from '../database/repositories/CustomerRepository';
import FindCustomerService from '../services/FindCustomerService';
import EditCustomerService from '../services/EditCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import SearchCustomerService from '../services/SearchCustomerService';

export default class CustomerControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const { fullName, cpf, birthday, contact } = req.body;

    const customerRepository = new CustomerRepository();
    const createCustomerService = new CreateCustomerService(customerRepository);

    try {
      const customer = await createCustomerService.execute({
        fullName,
        cpf,
        birthday,
        contact,
      });

      return res.json(customer);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const customerRepository = new CustomerRepository();
    const findCustomerService = new FindCustomerService(customerRepository);

    try {
      const customer = await findCustomerService.execute({ id });

      return res.json(customer);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { fullName, cpf, birthday, contact } = req.body;

    const customerRepository = new CustomerRepository();
    const editCustomerService = new EditCustomerService(customerRepository);

    try {
      const customer = await editCustomerService.execute({
        id,
        fullName,
        cpf,
        birthday,
        contact,
      });

      return res.json(customer);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const customerRepository = new CustomerRepository();
    const deleteCustomerService = new DeleteCustomerService(customerRepository);

    try {
      await deleteCustomerService.execute({ id });

      return res.send();
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

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
