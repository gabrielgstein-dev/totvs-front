import { NgModule } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PoButtonModule, PoModule } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';

import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, ConfirmModalComponent, CustomerListComponent],
  imports: [
    BrowserModule,
    PoModule,
    AppRoutingModule,
    PoButtonModule,
    CommonModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
