import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: [],
})
export class AddCustomerModalComponent {
  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;

  @Output() save = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();

  newCustomer: Customer = { name: '', cpf_cnpj: '', phone: '' };

  open() {
    this.newCustomer = { name: '', cpf_cnpj: '', phone: '' };
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onSave() {
    this.save.emit(this.newCustomer);
    this.close();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }
}
