import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HouseModel} from "../models/house-model";
import {map} from 'rxjs/operators';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  getHousesUrl = `${this.config.api}apartments`;
  saveHouseUrl = `${this.config.api}save-apartment`;
  deleteHouseUrl = `${this.config.api}delete-apartment/`;
  _houses;

  get houses(): HouseModel[] {
    return this._houses
  }

  set houses(val) {
    this._houses = val
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }


  getHouses(): any {
    return this.http.get(this.getHousesUrl).pipe(map((resp: any) => {
        this.houses = resp
        return resp;
      })
    )
  }

  getHouse(id: number): any {
    return this.houses.find( x => x.id == id);
  }

  saveHouse(house: HouseModel): any {
    return this.http.post(this.saveHouseUrl, house).pipe(map((resp: any) => {
      this.houses.push(resp);
      return resp;
    }));
  }

  deleteHouse(id): any {
    return this.http.delete(this.deleteHouseUrl + id).pipe(map((resp: any) => {
      this.houses = resp;
      return resp;
    }));
  }
}
