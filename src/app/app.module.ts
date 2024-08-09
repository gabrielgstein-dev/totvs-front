import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
