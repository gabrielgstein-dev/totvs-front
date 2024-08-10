import { ContractStatusEnum } from '../../shared/contract-status';

export interface Contract {
  id?: number;
  number: string;
  acquisitionDate: string;
  value: number;
  status: ContractStatusEnum;
}
