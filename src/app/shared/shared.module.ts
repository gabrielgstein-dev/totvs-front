import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { CustomerFilterComponent } from '../customer/components/customer-filter/customer-filter.component';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, PoModule],
  exports: [ConfirmModalComponent],
})
export class SharedModule {}
