import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

import { CustomerListComponent } from './customer-list.component';
import { CustomerTableComponent } from './components/customer-table-component/customer-table.component';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CustomerFilterComponent } from './components/customer-filter/customer-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PoModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: CustomerListComponent }]),
  ],
  declarations: [
    CustomerListComponent,
    CustomerTableComponent,
    CustomerFilterComponent,
    CustomerModalComponent,
  ],
  exports: [CustomerListComponent],
})
export class CustomerListModule {}
