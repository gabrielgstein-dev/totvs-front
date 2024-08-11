import { Component, ViewChild } from '@angular/core';
import { PoButtonGroupItem, PoTableColumn } from '@po-ui/ng-components';
import { CustomerService } from './services/customer.service';
import { ContractService } from './services/contract.service';
import { Customer } from './models/customer.model';
import { Contract } from './models/contract.model';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { CustomerContractModalComponent } from './components/customer-contract-modal/customer-contract-modal.component'; // Novo import
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';
import { formatCpfCnpj } from '../shared/utils/formatCpfCnpj';
import {
  ContractStatusEnum,
  contractStatusLabels,
} from '../shared/contract-status';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent {
  @ViewChild('customerModal') customerModal!: CustomerModalComponent;
  @ViewChild('contractModal') contractModal!: CustomerContractModalComponent;
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: ConfirmModalComponent;

  isLoading: boolean = false;
  customers: Customer[] = [];
  selectedCustomer: Customer = { name: '', cpf_cnpj: '', phone: '' };
  selectedContract: Contract = {
    acquisitionDate: '',
    value: 0,
    number: '',
    status: ContractStatusEnum.ON_SCHEDULE,
  };
  filterTerm: string = '';
  filteredCustomers: Customer[] = [];
  buttonStatusFilterSelected?: ContractStatusEnum;

  formatCpfCnpj = formatCpfCnpj;

  constructor(
    private customerService: CustomerService,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  buttonsFilter = [
    {
      label: 'Todos',
      action: this.loadCustomers.bind(this, undefined),
      selected: true,
    },
    {
      label: contractStatusLabels[ContractStatusEnum.ON_SCHEDULE],
      action: this.loadCustomers.bind(this, ContractStatusEnum.ON_SCHEDULE),
    },
    {
      label: contractStatusLabels[ContractStatusEnum.PAID_IN_FULL],
      action: this.loadCustomers.bind(this, ContractStatusEnum.PAID_IN_FULL),
    },
    {
      label: contractStatusLabels[ContractStatusEnum.PAST_DUE],
      action: this.loadCustomers.bind(this, ContractStatusEnum.PAST_DUE),
    },
    {
      label: contractStatusLabels[ContractStatusEnum.CANCELED],
      action: this.loadCustomers.bind(this, ContractStatusEnum.CANCELED),
    },
  ];

  loadCustomers(status?: ContractStatusEnum) {
    this.isLoading = true;
    this.buttonStatusFilterSelected = status;
    console.log(
      'this.buttonStatusFilterSelected',
      this.buttonStatusFilterSelected
    );
    this.customerService.getCustomers(status).subscribe((data) => {
      this.customers = data;
      this.filteredCustomers = data;
      this.isLoading = false;
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

  openAddContractModal(customer: Customer) {
    if (!customer.id) return;

    this.selectedCustomer = { ...customer };
    this.contractModal.title = `Adicionar contrato para ${customer.name}`;

    if (customer?.contracts?.length) {
      this.contractModal.title = `Editar o contrato de ${customer.name}`;
      this.contractModal.contract = {
        ...customer.contracts[customer.contracts.length - 1],
      };
    }

    this.contractModal.open(!!customer?.contracts?.length);
  }

  saveCustomer() {
    this.customerService.addCustomer(this.selectedCustomer).subscribe(() => {
      this.loadCustomers();
    });
  }

  saveContract(params: { customerId: number; contract: Contract }) {
    if (!params.customerId) {
      console.error('ID do cliente não encontrado');
      return;
    }

    if (params.contract.id) {
      this.contractService
        .updateContract(params.customerId, params.contract)
        .subscribe(() => {
          this.loadCustomers();
        });
    } else {
      this.contractService
        .createContract(params.customerId, params.contract)
        .subscribe(() => {
          this.loadCustomers();
        });
    }
  }

  cancelContract(params: { customerId: number; contractId: number }) {
    if (!params.customerId || !params.contractId) {
      console.error('ID do cliente ou contrato não encontrado');
      return;
    }

    this.contractService
      .deleteContract(params.customerId, params.contractId)
      .subscribe(() => {
        this.loadCustomers();
      });
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
