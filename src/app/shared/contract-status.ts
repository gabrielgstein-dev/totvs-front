export enum ContractStatusEnum {
  PAST_DUE = 'PAST_DUE',
  ON_SCHEDULE = 'ON_SCHEDULE',
  PAID_IN_FULL = 'PAID_IN_FULL',
  CANCELED = 'CANCELED',
}

export const contractStatusLabels: Record<ContractStatusEnum, string> = {
  [ContractStatusEnum.PAST_DUE]: 'Em Atraso',
  [ContractStatusEnum.ON_SCHEDULE]: 'Dentro do Prazo',
  [ContractStatusEnum.PAID_IN_FULL]: 'Pago',
  [ContractStatusEnum.CANCELED]: 'Cancelado',
};
