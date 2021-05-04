import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainpageComponent} from "./components/mainpage/mainpage.component";
import {ExpensesComponent} from "./components/expenses/expenses.component";
import {HousesComponent} from "./components/houses/houses.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {ReportsComponent} from "./components/reports/reports.component";
import {ResidentsComponent} from "./components/residents/residents.component";
import {AuthGuardServiceService} from "./services/auth-guard-service.service";


const routes: Routes = [
  {
    path: 'mainpage',
    component: MainpageComponent
  },

  {
    path: 'expenses',
    component: ExpensesComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'houses',
    component: HousesComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'report',
    component: ReportsComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: 'residents',
    component: ResidentsComponent,
    //canActivate: [AuthGuardServiceService]
  },
  {
    path: '**',
    redirectTo: 'mainpage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
