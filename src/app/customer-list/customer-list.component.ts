import { Component, ViewChild } from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Customer } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';
import { ContractStatus } from '../shared/contract-status.enum';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  @ViewChild('addCustomerModal')
  addCustomerModal!: PoModalComponent;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  customers: Customer[] = [];

  newCustomer: Customer = { name: '', cpf_cnpj: '', phone: '' };

  filterTerm: string = '';

  status: ContractStatus = '' as ContractStatus;

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
    if (this.customers) {
      this.customers.push({ ...this.newCustomer });
      this.addCustomerModal.close();
    } else {
      console.error('A lista de clientes não foi inicializada.');
    }
  }

  closeModal() {
    this.addCustomerModal.close();
  }
}
