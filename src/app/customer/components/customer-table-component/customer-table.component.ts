import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Customer } from '../../models/customer.model';
import { formatCpfCnpj } from '../../../shared/utils/formatCpfCnpj';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent {
  @Input() customers: Customer[] = [];
  @Input() columns: PoTableColumn[] = [];

  formatCpfCnpj = formatCpfCnpj;

  @Output() confirmDelete = new EventEmitter<Customer>();

  onDelete(customer: Customer) {
    this.confirmDelete.emit(customer);
  }
}
