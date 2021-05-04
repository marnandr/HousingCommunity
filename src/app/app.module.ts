import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HousesComponent} from './components/houses/houses.component';
import {ResidentsComponent} from './components/residents/residents.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {ExpensesComponent} from './components/expenses/expenses.component';
import {ReportsComponent} from './components/reports/reports.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {HouseComponent} from './components/house/house.component';
import {TitleComponent} from './components/title/title.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ResidentComponent} from './components/resident/resident.component';
import {PaymentComponent} from './components/payment/payment.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { BillComponent } from './components/bill/bill.component';
import { EarningComponent } from './components/earning/earning.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HousesComponent,
    ResidentsComponent,
    PaymentsComponent,
    ExpensesComponent,
    ReportsComponent,
    MainpageComponent,
    HouseComponent,
    TitleComponent,
    ResidentComponent,
    PaymentComponent,
    BillComponent,
    EarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
