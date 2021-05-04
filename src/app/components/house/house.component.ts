import {Component, Input, OnInit} from '@angular/core';
import {HouseModel} from "../../models/house-model";
import {HousesService} from "../../services/houses.service";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {

  @Input() house: HouseModel;
  @Input() isList: boolean = true;
  constructor(
    private houseService: HousesService
  ) { }

  ngOnInit(): void {
  }

  onDelete(id){
    this.houseService.deleteHouse(id).subscribe( resp =>{
    })
  }

}
