export interface Customer {
  id?: number;
  name: string;
  phone: string;
  cpf_cnpj: string;
}

export interface CustomerDTO {
  id: number;
  name: string;
  phone: string;
  cpf: string | null;
  cnpj: string | null;
}
