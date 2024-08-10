import { Contract } from './contract.model';

export interface Customer {
  id?: number;
  name: string;
  phone: string;
  cpf_cnpj: string;
  contracts?: Contract[];
}

export interface CustomerDTO {
  id: number;
  name: string;
  phone: string;
  cpf: string | null;
  cnpj: string | null;
  contracts?: Contract[];
}
