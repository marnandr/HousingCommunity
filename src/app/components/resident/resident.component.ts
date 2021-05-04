import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ResidentService} from "../../services/resident.service";
import {HousesService} from "../../services/houses.service";
import {ResidentModel} from "../../models/resident-model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HouseModel} from "../../models/house-model";

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {
  @Input() resident: ResidentModel
  @Input() isList: boolean = true
  @Input() residentId: number

  @ViewChild('moveModal')
  private moveModal: TemplateRef<any> | undefined;

  selectedHouse: HouseModel
  houseId
  isSet = false;
  statingAmount: number

  constructor(
    private residentService: ResidentService,
    private houseService: HousesService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.houseService.getHouses().subscribe( resp => {
    })
  }

  getHouses(){
    return this.houseService.houses;
  }

  openMoveModal(){
    this.isSet = false;
    this.modal.open(this.moveModal);
    this.houseId = null
  }

  closeModal(){
    this.modal.dismissAll();
  }

  onSubmit(makebalance: boolean){
    const sentObject ={
      makebalance: makebalance,
      amount: this.statingAmount,
      residentID: this.residentId,
      apartment: this.houseId
    }
    this.residentService.moveResident(sentObject).subscribe( resp => {
      this.modal.dismissAll();
    })
  }

  onHouseChoose(){
    this.selectedHouse = this.houseService.getHouse(this.houseId)
    //this.houseId = null
    this.isSet = true;
  }

}
