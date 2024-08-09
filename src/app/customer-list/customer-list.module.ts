import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  PoTableModule,
  PoButtonModule,
  PoFieldModule,
  PoModalModule,
} from '@po-ui/ng-components';
import { CustomerListComponent } from './customer-list.component';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    FormsModule,
    PoTableModule,
    PoButtonModule,
    PoModalModule,
    PoFieldModule,
    RouterModule.forChild([{ path: '', component: CustomerListComponent }]),
  ],
})
export class CustomerListModule {}
