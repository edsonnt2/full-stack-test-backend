import DeleteCustomerService from './DeleteCustomerService';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

let fakeCustomerRepository: FakeCustomerRepository;
let deleteCustomerService: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    deleteCustomerService = new DeleteCustomerService(fakeCustomerRepository);
  });

  it('should be able to delete customer for ID', async () => {
    const deleteByIdSpy = jest.spyOn(fakeCustomerRepository, 'deleteById');

    const customer = await fakeCustomerRepository.create({
      fullName: 'Edson Rodrigo',
      cpf: '12345678909',
      birthday: new Date('1991-08-09'),
      contact: {
        email: 'edson_nt2@hotmail.com',
        phone: '19992698994',
      },
    });

    await deleteCustomerService.execute({
      id: customer.id,
    });

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should not be able to delete customer with ID non-exists', async () => {
    await expect(
      deleteCustomerService.execute({
        id: 'id-non-exists',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
