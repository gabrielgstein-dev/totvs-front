import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Contract } from '../../models/contract.model';
import { ContractStatusEnum } from '../../../shared/contract-status';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-contract-modal',
  templateUrl: './customer-contract-modal.component.html',
  styleUrls: [],
})
export class CustomerContractModalComponent {
  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;

  @Input() customer: Customer = { name: '', cpf_cnpj: '', phone: '' };
  @Input() contract: Contract = {
    acquisitionDate: '',
    value: 0,
    number: '',
    status: ContractStatusEnum.ON_SCHEDULE,
  };
  @Input() title: string = 'Adicionar contrato';
  @Output() saveContract = new EventEmitter<{
    customerId: number;
    contract: Contract;
  }>();

  contractStatus = {
    label: 'Dentro do Prazo',
    value: ContractStatusEnum.ON_SCHEDULE,
  };

  statusOptions = [
    { label: 'Em Atraso', value: ContractStatusEnum.PAST_DUE },
    { label: 'Dentro do Prazo', value: ContractStatusEnum.ON_SCHEDULE },
    { label: 'Pago', value: ContractStatusEnum.PAID_IN_FULL },
    { label: 'Cancelado', value: ContractStatusEnum.CANCELED },
  ];

  originalContract: Contract = {
    acquisitionDate: '',
    value: 0,
    number: '',
    status: ContractStatusEnum.ON_SCHEDULE,
  };

  saveDisabled = true;

  onInputChange() {
    this.saveDisabled =
      !this.contract.number.trim() ||
      !this.contract.acquisitionDate.trim() ||
      !this.contract.value ||
      (this.contract.number === this.originalContract.number &&
        this.contract.acquisitionDate ===
          this.originalContract.acquisitionDate &&
        this.contract.value === this.originalContract.value &&
        this.contract.status === this.originalContract.status);
  }

  resetContract() {
    this.contract = {
      acquisitionDate: '',
      value: 0,
      number: '',
      status: ContractStatusEnum.ON_SCHEDULE,
    };
    this.originalContract = { ...this.contract };
  }

  open(isEdit: boolean = false) {
    if (isEdit) {
      this.originalContract = { ...this.contract };
    } else {
      this.resetContract();
    }
    this.modal.open();
  }

  close() {
    this.originalContract = {
      acquisitionDate: '',
      value: 0,
      number: '',
      status: ContractStatusEnum.ON_SCHEDULE,
    };
    this.modal.close();
  }

  onSave() {
    if (!this.customer?.id) return;
    this.saveContract.emit({
      contract: this.contract,
      customerId: this.customer.id,
    });
    this.close();
  }

  onCancel() {
    this.close();
  }
}
