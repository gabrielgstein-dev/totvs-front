import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
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
  @Output() confirmDelete = new EventEmitter<Customer>();
  @Output() edit = new EventEmitter<Customer>();
  @Output() addContract = new EventEmitter<Customer>();

  columns: PoTableColumn[] = [
    { property: 'name', label: 'Nome' },
    {
      property: 'cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'cellTemplate',
    },
    { property: 'phone', label: 'Telefone' },
    { property: 'contract', label: 'Status', type: 'cellTemplate' },
    { property: 'actions', label: 'Ações', type: 'cellTemplate' },
  ];

  formatCpfCnpj = formatCpfCnpj;

  getStatusLabel(contracts: Contract[]) {
    if (!contracts.length) {
      return 'Sem contrato';
    }
    const lastContract = contracts[contracts.length - 1];
    return contractStatusLabels[lastContract.status];
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
