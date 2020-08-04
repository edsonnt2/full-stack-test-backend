import CreateCustomerService from './CreateCustomerService';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

let fakeCustomerRepository: FakeCustomerRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    createCustomerService = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      fullName: 'Edson Rodrigo',
      cpf: 12345678909,
      birthday: '1991-08-09',
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: 19992698994,
      },
    });

    expect(customer).toHaveProperty('id');
    expect(customer.contact.email).toBe('edson_nt2@hotmail.com');
  });

  it('should not be able to create a new customer with e-mail already registered', async () => {
    const customer = await createCustomerService.execute({
      fullName: 'Edson Rodrigo',
      cpf: 12345678909,
      birthday: '1991-08-09',
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: 19992698994,
      },
    });

    await expect(
      createCustomerService.execute({
        fullName: 'Customer Secundary',
        cpf: 12345678900,
        birthday: '1991-08-09',
        contact: {
          email: customer.contact.email,
          phone: 1932445945,
        },
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new customer with cpf already registered', async () => {
    const customer = await createCustomerService.execute({
      fullName: 'Edson Rodrigo',
      cpf: 12345678909,
      birthday: '1991-08-09',
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: 19992698994,
      },
    });

    await expect(
      createCustomerService.execute({
        fullName: 'Customer Secundary',
        cpf: Number(customer.cpf),
        birthday: '1991-08-09',
        contact: {
          email: 'customer@mail.com',
          phone: 1932445945,
        },
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new customer with phone already registered', async () => {
    const customer = await createCustomerService.execute({
      fullName: 'Edson Rodrigo',
      cpf: 12345678909,
      birthday: '1991-08-09',
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: 19992698994,
      },
    });

    await expect(
      createCustomerService.execute({
        fullName: 'Customer Secundary',
        cpf: 12345678900,
        birthday: '1991-08-09',
        contact: {
          email: 'customer@mail.com',
          phone: Number(customer.contact.phone),
        },
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
