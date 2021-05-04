import {Component, OnInit} from '@angular/core';
import {ResidentService} from "../../services/resident.service";
import {HousesService} from "../../services/houses.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HouseModel} from "../../models/house-model";
import {ResidentModel} from "../../models/resident-model";

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {
  isLoading: boolean;
  isNewResident = false
  houseId;
  resident = new ResidentModel();
  residentForm: FormGroup = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    age: [null, Validators.required]
  })


  constructor(
    private residentService: ResidentService,
    private houseService: HousesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.residentService.getResidents().subscribe( resp => {
      this.isLoading = false;
    })

  }

  onSubmit(){
    this.resident.apartment = this.houseService.getHouse(this.houseId);
    console.log(this.houseService.getHouse(this.houseId));
    this.residentService.saveResident(this.resident).subscribe( resp => {
      this.onNewResident();
    })
  }

  getResidents() {
    return this.residentService.residents;
  }

  getHouses(): HouseModel[]{
    return this.houseService.houses;
  }

  onNewResident(){
    this.isNewResident = !this.isNewResident;
  }

  onHouseChoose(event){
  }
}
