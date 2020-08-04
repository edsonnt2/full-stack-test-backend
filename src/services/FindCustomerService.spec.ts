import FindCustomerService from './FindCustomerService';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

let fakeCustomerRepository: FakeCustomerRepository;
let findCustomerService: FindCustomerService;

describe('FindCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    findCustomerService = new FindCustomerService(fakeCustomerRepository);
  });

  it('should be able to find customer for ID', async () => {
    const customer = await fakeCustomerRepository.create({
      fullName: 'Edson Rodrigo',
      cpf: '12345678909',
      birthday: new Date('1991-08-09'),
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: '19992698994',
      },
    });

    const findCustomer = await findCustomerService.execute({
      id: customer.id,
    });

    expect(findCustomer).toBe(customer);
  });

  it('should not be able to find customer with ID non-exists', async () => {
    await expect(
      findCustomerService.execute({
        id: 'id-non-exists',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
