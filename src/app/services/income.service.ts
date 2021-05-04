import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  getIncomesUrl = `${this.config.api}residents`;
  saveIncomeUrl = `${this.config.api}save-resident`;
  deleteIncomeUrl = `${this.config.api}delete-resident/`;

  _incomes;

  get incomes() {
    return this._incomes;
  }

  set incomes(val) {
    this._incomes = val;
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
  }

  getIncomes() {
    return this.http.get(this.getIncomesUrl).pipe(map((resp: any) => {
      this.incomes = resp
      return resp;
    }));
  }

  getIncome(id): any {
    return this.incomes.find(obj => obj.id === id)
  }

  saveIncome(income): any {
    return this.http.post(this.saveIncomeUrl, income).pipe(map((resp: any) => {
      this.incomes.push(resp);
      return resp;
    }));
  }
}
