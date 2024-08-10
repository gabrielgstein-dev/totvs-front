import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import {
  PoTableModule,
  PoButtonModule,
  PoFieldModule,
  PoModalModule,
} from '@po-ui/ng-components';
import { CustomerListComponent } from './customer-list.component';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [CustomerListComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    PoTableModule,
    PoButtonModule,
    PoModalModule,
    PoFieldModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: CustomerListComponent }]),
  ],
})
export class CustomerListModule {}
