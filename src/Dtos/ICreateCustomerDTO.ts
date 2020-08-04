export default interface ICreateCustomerDTO {
  fullName: string;
  cpf: string;
  birthday: Date;
  contact: {
    phone: string;
    email: string;
  };
}
