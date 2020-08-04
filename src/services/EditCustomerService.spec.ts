import EditCustomerService from './EditCustomerService';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

let fakeCustomerRepository: FakeCustomerRepository;
let editCustomerService: EditCustomerService;

describe('EditCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    editCustomerService = new EditCustomerService(fakeCustomerRepository);
  });

  it('should be able to edit customer for ID', async () => {
    const customer = await fakeCustomerRepository.create({
      fullName: 'Edson Rodrigo',
      cpf: '12345678909',
      birthday: new Date('1991-08-09'),
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: '19992698994',
      },
    });

    const editCustomer = await editCustomerService.execute({
      id: customer.id,
      fullName: 'Edson Rodrigo da Silva',
      cpf: 98765432100,
      birthday: '1991-08-09',
      contact: {
        email: 'edson_nt2@mail.com',
        phone: 19994566958,
      },
    });

    expect(editCustomer).toEqual(
      expect.objectContaining({
        id: customer.id,
        fullName: 'Edson Rodrigo da Silva',
        cpf: '98765432100',
      }),
    );
  });

  it('should not be able to edit customer with ID non-exists', async () => {
    await expect(
      editCustomerService.execute({
        id: 'id-non-exists',
        fullName: 'Edson Rodrigo da Silva',
        cpf: 98765432100,
        birthday: '1991-08-09',
        contact: {
          email: 'edson_nt2@mail.com',
          phone: 19994566958,
        },
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
