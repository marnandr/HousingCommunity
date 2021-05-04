import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {BillModel} from "../../models/bill-model";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  residentId;
  constructor(
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.expenseService.getBalances().subscribe(resp => {
    })
  }

  getBalances():  BillModel[]{
    return this.expenseService.balances;
  }

  onResidentPick() {
    //this.residentId = null;
  }

  onSubmit(){
    if (!this.residentId){

    }else{

    }
  }

}
