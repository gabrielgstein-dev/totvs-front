import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: [],
})
export class CustomerModalComponent {
  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;

  @Input() customer: Customer = { name: '', cpf_cnpj: '', phone: '' };
  @Input() title: string = 'Adicionar Cliente';
  @Output() save = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();

  open(customer?: Customer) {
    this.customer = customer
      ? { ...customer }
      : { name: '', cpf_cnpj: '', phone: '' };
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onSave() {
    this.save.emit(this.customer);
    this.close();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }
}
