import ListCustomerService from './ListCustomerService';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

let fakeCustomerRepository: FakeCustomerRepository;
let listCustomerService: ListCustomerService;

describe('ListCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    listCustomerService = new ListCustomerService(fakeCustomerRepository);
  });

  it('should be able to list customers', async () => {
    const customer = await fakeCustomerRepository.create({
      fullName: 'Edson Rodrigo',
      cpf: '12345678909',
      birthday: new Date('1991-08-09'),
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: '19992698994',
      },
    });

    const customerTwo = await fakeCustomerRepository.create({
      fullName: 'John Joe',
      cpf: '12345678905',
      birthday: new Date('1991-08-09'),
      contact: {
        email: 'john@mail.com',
        phone: '19992698993',
      },
    });

    const listCustomers = await listCustomerService.execute();

    expect(listCustomers).toEqual([customer, customerTwo]);
  });
});
