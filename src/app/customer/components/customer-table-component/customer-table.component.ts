import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  PoSearchFilterMode,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Customer } from '../../models/customer.model';
import { formatCpfCnpj } from '../../../shared/utils/formatCpfCnpj';
import { Contract } from '../../models/contract.model';
import {
  ContractStatusEnum,
  contractStatusLabels,
} from '../../../shared/contract-status';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent {
  @Input() customers: Customer[] = [];
  @Input() tableLoading: boolean = false;
  @Output() confirmDelete = new EventEmitter<Customer>();
  @Output() edit = new EventEmitter<Customer>();
  @Output() addContract = new EventEmitter<Customer>();

  actions: PoTableAction[] = [
    {
      label: 'Adicionar Contrato',
      visible: (row: Customer) => {
        return !row?.contracts?.length;
      },
      action: this.onAddContract.bind(this),
    },
    {
      label: 'Visualizar Contrato',
      visible: (row: Customer) => {
        return !!row?.contracts?.length;
      },

      action: this.onAddContract.bind(this),
    },
    {
      label: 'Editar',
      action: this.onEdit.bind(this),
    },
    {
      label: 'Excluir',
      type: 'danger',
      action: this.onDelete.bind(this),
    },
  ];

  columns: PoTableColumn[] = [
    { property: 'name', label: 'Nome' },
    {
      property: 'cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'cellTemplate',
    },
    { property: 'phone', label: 'Telefone' },
    {
      property: 'contractNumber',
      label: 'Número do contrato',
      type: 'cellTemplate',
    },
    { property: 'contract', label: 'Status', type: 'cellTemplate' },
  ];

  formatCpfCnpj = formatCpfCnpj;

  getStatusLabel(contracts: Contract[]) {
    if (!contracts.length) {
      return 'Sem contrato';
    }
    const lastContract = contracts[contracts.length - 1];
    return contractStatusLabels[lastContract.status];
  }

  getContractNumber(contracts: Contract[]) {
    if (!contracts.length) {
      return 'Sem contrato';
    }
    return contracts[contracts.length - 1].number;
  }

  getFilterType() {
    return PoSearchFilterMode.contains;
  }

  onEdit(customer: Customer) {
    this.edit.emit(customer);
  }

  onDelete(customer: Customer) {
    this.confirmDelete.emit(customer);
  }

  onAddContract(customer: Customer) {
    this.addContract.emit(customer);
  }
}
