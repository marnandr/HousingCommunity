import {Component, OnInit} from '@angular/core';
import {HouseModel} from "../../models/house-model";
import {HousesService} from "../../services/houses.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {
  loadedHouses: HouseModel[];
  isNewHouse = false;
  isLoading: boolean;

  houseForm: FormGroup = this.formBuilder.group({
    floor: [null, Validators.required],
    door: [null, Validators.required],
    area: [null, Validators.required],
    airspace: [null, Validators.required]
  })

  constructor(
    private housesService: HousesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.housesService.getHouses().subscribe((resp: any) => {
      this.loadedHouses = resp;
      this.isLoading = false;
    })
  }

  getHouses(){
    return this.housesService.houses;
  }

  onNewHouse() {
    this.isNewHouse = !this.isNewHouse;
  }

  onSubmit(){
    this.housesService.saveHouse(this.houseForm.value).subscribe( resp => {
      this.onNewHouse();
    })
  }

  trackByFn(index: any, item: any): void {
    return index;
  }

}
