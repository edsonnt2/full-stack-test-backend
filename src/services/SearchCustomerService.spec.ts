import SearchCustomerService from './SearchCustomerService';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

let fakeCustomerRepository: FakeCustomerRepository;
let searchCustomerService: SearchCustomerService;

describe('SearchCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    searchCustomerService = new SearchCustomerService(fakeCustomerRepository);
  });

  it('should be able to list customers for search', async () => {
    const customerOne = await fakeCustomerRepository.create({
      fullName: 'Edson Rodrigo',
      cpf: '12345678909',
      birthday: new Date('1991-08-09'),
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: '19992698994',
      },
    });

    const customerTwo = await fakeCustomerRepository.create({
      fullName: 'Test Search',
      cpf: '12345678900',
      birthday: new Date('1991-08-09'),
      contact: {
        email: 'test@mail.com',
        phone: '19999999999',
      },
    });

    const findCustomers = await searchCustomerService.execute({
      search: '999',
    });

    expect(findCustomers).toEqual([customerOne, customerTwo]);
  });
});
