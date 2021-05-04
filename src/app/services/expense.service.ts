import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  getExpensesUrl = `${this.config.api}residents`;
  saveExpenseUrl = `${this.config.api}save-resident`;
  deleteExpenseUrl = `${this.config.api}delete-resident/`;
  saveUniqueExpenseUrl = `${this.config.api}unique-expense`;
  saveCommonExpenseUrl = `${this.config.api}divided-expense`;
  savePaymentUrl = `${this.config.api}save-income`;
  getBalanceUrl =  `${this.config.api}get-balance`;

  _expenses;
  _balances;

  get expenses() {
    return this._expenses;
  }

  set expenses(val) {
    this._expenses = val;
  }

  get balances() {
    return this._balances;
  }

  set balances(val) {
    this._balances = val;
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
  }

  getExpenses() {
    return this.http.get(this.getExpensesUrl).pipe(map((resp: any) => {
      this.expenses = resp;
      return resp;
    }));
  }

  saveUniqueExpense(expense) {
    return this.http.post(this.saveUniqueExpenseUrl, expense).pipe(map((resp: any) => {
      //this.expenses.push(resp);
      return resp;
    }));
  }

  saveCommonExpense(expense){
    return this.http.post(this.saveCommonExpenseUrl, expense).pipe(map((resp: any) => {
      return resp;
    }));
  }

  getExpense(id): any {
    return this.expenses.find(obj => obj.id === id)
  }

  savePayment(body): any {
    return this.http.post(this.savePaymentUrl, body).pipe(map((resp: any) => {
      return resp;
    }));
  }

  getBalances(): any {
    return this.http.get(this.getBalanceUrl).pipe(map((resp: any) => {
      this.balances = resp;
      return resp;
    }));
  }
}
