export default interface IFindByCustomerDTO {
  where: 'email' | 'cpf' | 'phone';
  find: string;
}
