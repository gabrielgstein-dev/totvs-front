import { Component, ViewChild } from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { ContractStatus } from '../shared/contract-status.enum';
import { formatCpfCnpj } from '../shared/utils/formatCpfCnpj';
import { TableColumn } from './customer-list.interfaces';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  @ViewChild('addCustomerModal')
  addCustomerModal!: PoModalComponent;

  columns: TableColumn[] = [
    { property: 'name', label: 'Nome' },
    {
      property: 'cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'cellTemplate',
    },
    { property: 'phone', label: 'Número do Contrato' },
  ];

  customers: Customer[] = [];
  newCustomer: Customer = { name: '', cpf_cnpj: '', phone: '' };
  filterTerm: string = '';
  status: ContractStatus = '' as ContractStatus;
  formatCpfCnpj = formatCpfCnpj;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  primaryModalAction = {
    action: () => this.saveCustomer(),
    label: 'Salvar',
  };

  cancelModalAction = {
    action: () => this.addCustomerModal.close(),
    label: 'Cancelar',
  };

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes', error);
      },
      complete: () => {
        console.log('Requisição de clientes concluída');
      },
    });
  }

  statusComboOptions = [
    { label: 'Em Atraso', value: ContractStatus.PAST_DUE },
    { label: 'Dentro do Prazo', value: ContractStatus.ON_SCHEDULE },
    { label: 'Pago', value: ContractStatus.PAID_IN_FULL },
    { label: 'Cancelado', value: ContractStatus.CANCELED },
  ];

  get filteredCustomers(): Customer[] {
    return this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        customer.cpf_cnpj.includes(this.filterTerm)
    );
  }

  openAddCustomerModal() {
    this.newCustomer = { name: '', cpf_cnpj: '', phone: '' };
    this.addCustomerModal.open();
  }

  saveCustomer() {
    this.customerService.addCustomer(this.newCustomer).subscribe({
      next: () => {
        this.loadCustomers();
        this.newCustomer = { name: '', cpf_cnpj: '', phone: '' };
        this.addCustomerModal.close();
      },
      error: (error) => {
        console.error('Erro ao adicionar cliente', error);
      },
      complete: () => {
        console.log('Cliente adicionado com sucesso');
      },
    });
  }

  closeModal() {
    this.addCustomerModal.close();
  }
}
