import {Component, Input, OnInit} from '@angular/core';
import {ExpenseModel} from "../../models/expense-model";
import {ResidentService} from "../../services/resident.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() payment: ExpenseModel;
  @Input() isIncome: boolean;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  classSetter(){
    if (this.isIncome){
      return 'income-box';
    }else {
      return  'expense-box';
    }
  }
}
