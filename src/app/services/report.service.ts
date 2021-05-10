import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  getAllReportUrl = `${this.config.api}report-income`;
  getOneReportURl = `${this.config.api}report-income/`;
  getAllExpenseUrl = `${this.config.api}report-expense`;
  getOneExpenseURl = `${this.config.api}report-expense/`;

  _report;
  _reportExpense;

  get report() {
    return this._report;
  }

  set report(val: any) {
    this._report = val;
  }

  get reportExpense(){
    return this._reportExpense
  }

  set reportExpense(val: any){
    this._reportExpense = val;
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
  }

  getAllReport(body) {
    return this.http.post(this.getAllReportUrl, body).pipe(map((resp: any) => {
      this.report = resp;
      return resp;
    }));
  }

  getOneReport(id: number, body) {
    return this.http.post(this.getOneReportURl + id, body).pipe(map((resp: any) => {
      this.report = resp;
      return resp;
    }));
  }

  getAllReportExpense(body) {
    return this.http.post(this.getAllExpenseUrl, body).pipe(map((resp: any) => {
      this.reportExpense = resp;
      return resp;
    }));
  }

  getOneReportExpense(id: number, body) {
    return this.http.post(this.getOneExpenseURl + id, body).pipe(map((resp: any) => {
      this.reportExpense = resp;
      return resp;
    }));
  }


}
