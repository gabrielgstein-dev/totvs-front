import { Component, ViewChild } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { CustomerService } from './services/customer.service';
import { Customer } from './models/customer.model';
import { ContractStatus } from '../shared/contract-status.enum';
import { formatCpfCnpj } from '../shared/utils/formatCpfCnpj';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  @ViewChild('customerModal') customerModal!: CustomerModalComponent;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: ConfirmModalComponent;

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  filterTerm: string = '';
  selectedCustomer: Customer = { name: '', cpf_cnpj: '', phone: '' };
  status: ContractStatus = ContractStatus.ON_SCHEDULE;
  statusComboOptions = [
    { label: 'Em Atraso', value: ContractStatus.PAST_DUE },
    { label: 'Dentro do Prazo', value: ContractStatus.ON_SCHEDULE },
    { label: 'Pago', value: ContractStatus.PAID_IN_FULL },
    { label: 'Cancelado', value: ContractStatus.CANCELED },
  ];

  columns: PoTableColumn[] = [
    { property: 'name', label: 'Nome' },
    {
      property: 'cpf_cnpj',
      label: 'CPF/CNPJ',
      type: 'cellTemplate',
    },
    { property: 'phone', label: 'Telefone' },
    { property: 'actions', label: 'Ações', type: 'cellTemplate' },
  ];

  formatCpfCnpj = formatCpfCnpj;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.filteredCustomers = data;
    });
  }

  onFilterChange(filterTerm: string) {
    this.filteredCustomers = this.customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
        customer.cpf_cnpj.includes(filterTerm)
    );
  }

  openAddCustomerModal() {
    this.selectedCustomer = { name: '', cpf_cnpj: '', phone: '' };
    this.customerModal.title = 'Adicionar Cliente';
    this.customerModal.open();
  }

  openEditCustomerModal(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.customerModal.title = 'Editar Cliente';
    this.customerModal.open();
  }

  saveCustomer(customer: Customer) {
    if (customer.id) {
      this.customerService.updateCustomer(customer).subscribe(() => {
        this.loadCustomers();
      });
    } else {
      this.customerService.addCustomer(customer).subscribe(() => {
        this.loadCustomers();
      });
    }
  }

  openConfirmDeleteModal(customer: Customer) {
    this.confirmDeleteModal.confirmLabel = 'Excluir';
    this.confirmDeleteModal.danger = true;
    this.confirmDeleteModal.onConfirm = () => {
      this.deleteCustomer(customer);
      this.confirmDeleteModal.close();
    };
    this.confirmDeleteModal.open();
  }

  deleteCustomer(customer: Customer) {
    if (!customer.id) {
      console.error('ID do cliente não encontrado');
      return;
    }
    this.customerService.deleteCustomer(customer.id).subscribe(() => {
      this.loadCustomers();
    });
  }
}
