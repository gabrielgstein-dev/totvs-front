import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PoModule, PoContainerModule } from '@po-ui/ng-components';

import { CustomerListModule } from './customer/customer-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PoModule,
    CustomerListModule,
    SharedModule,
    PoContainerModule,
  ],
  providers: [],
})
export class AppModule {}
