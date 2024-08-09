import { Component, ViewChild } from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Customer } from './customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  @ViewChild('addCustomerModal')
  addCustomerModal!: PoModalComponent;

  filterTerm: string = '';
  customers: Customer[] = [
    {
      name: 'John Doe',
      cpf: '123.456.789-00',
      contractNumber: '001',
      status: 'Em Atraso',
    },
    {
      name: 'Jane Smith',
      cpf: '987.654.321-00',
      contractNumber: '002',
      status: 'Pago',
    },
  ];

  newCustomer: Customer = { name: '', cpf: '', contractNumber: '', status: '' };

  get filteredCustomers(): Customer[] {
    return this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        customer.cpf.includes(this.filterTerm)
    );
  }

  openAddCustomerModal() {
    this.newCustomer = { name: '', cpf: '', contractNumber: '', status: '' }; // Reseta o formulário
    this.addCustomerModal.open();
  }

  saveCustomer() {
    this.customers.push({ ...this.newCustomer });
    this.addCustomerModal.close();
  }

  closeModal() {
    this.addCustomerModal.close();
  }
}
