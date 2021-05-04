import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill-model";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @Input() bill: BillModel;
  showResident = true;

  constructor() { }

  ngOnInit(): void {
  }

  onResident(){
    this.showResident = !this.showResident;
  }

}
