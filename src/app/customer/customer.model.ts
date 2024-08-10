export interface Customer {
  name: string;
  cpf_cnpj: string;
  phone: string;
}

export interface CustomerDTO {
  name: string;
  phone: string;
  cpf?: string;
  cnpj?: string;
}
