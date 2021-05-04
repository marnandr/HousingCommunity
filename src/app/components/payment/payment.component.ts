import {Component, Input, OnInit} from '@angular/core';
import {ExpenseModel} from "../../models/expense-model";
import {ResidentService} from "../../services/resident.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() payment: ExpenseModel
  constructor(
  ) { }

  ngOnInit(): void {
  }

  classSetter(isIncome: boolean){
    if (isIncome){
      return 'text-white bg-success';
    }else {
      return  'text-white bg-danger';
    }
  }
}
