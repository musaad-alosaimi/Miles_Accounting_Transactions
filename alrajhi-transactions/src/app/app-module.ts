import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { DashboardComponent } from './features/dashboard/dashboard';
import { TransactionListComponent } from './features/transactions/transaction-list/transaction-list';
import { TransactionDetailComponent } from './features/transactions/transaction-detail/transaction-detail';
import { ConfigComponent } from './features/config/config';
import { SidebarComponent } from './shared/components/sidebar/sidebar';

@NgModule({
  declarations: [
    App,
    DashboardComponent,
    TransactionListComponent,
    TransactionDetailComponent,
    ConfigComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
