import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {ResidentModel} from "../models/resident-model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  getResidentsUrl = `${this.config.api}residents`;
  saveResidentUrl = `${this.config.api}save-resident`;
  moveResidentUrl = `${this.config.api}move-resident`;

  _residents: ResidentModel[];

  get residents() {
    return this._residents;
  }

  set residents(val) {
    this._residents = val;
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
  }


  getResidents() {
    return this.http.get(this.getResidentsUrl).pipe(map((resp: any) => {
      this.residents = resp;
      return resp;
    }));
  }



  saveResident(resident: ResidentModel) {
    return this.http.post(this.saveResidentUrl, resident).pipe(map((resp: any) => {
      this.residents.push(resp);
      return resp;
    }));
  }

  getResident(id): any {
    return this.residents.find(obj => obj.id == id)
  }

  moveResident(object){
    return this.http.post(this.moveResidentUrl, object).pipe(map((resp: any) => {
      this.residents.push(resp);
      return resp;
    }));
  }

}
