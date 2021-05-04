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
  _report;

  get report() {
    return this._report;
  }

  set report(val: any) {
    this._report = val;
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
  }

  getAllReport() {
    return this.http.get(this.getAllReportUrl).pipe(map((resp: any) => {
      this.report = resp
      return resp;
    }))
  }

  getOneReport(id: number) {
    return this.http.get(this.getOneReportURl + id).pipe(map((resp: any) => {
      this.report = resp
      return resp;
    }))
  }


}
