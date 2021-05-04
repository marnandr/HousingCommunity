import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResidentService} from "../../services/resident.service";
import {ExpenseService} from "../../services/expense.service";
import {ResidentModel} from "../../models/resident-model";
import {BillModel} from "../../models/bill-model";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  isNewPayment = false;
  residentId
  loadedResident
  isSet = false;
  amount = 0;
  announced;

  constructor(
    private residentService: ResidentService,
    private expenseService: ExpenseService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.residentService.getResidents().subscribe(resp => {
    })

    this.expenseService.getBalances().subscribe(resp => {
    })
  }

  onSubmit() {

  }

  getPayments() {
    return this.expenseService.expenses;
  }

  onNewPayment() {
    this.isNewPayment = !this.isNewPayment;
  }

  getResidents(): ResidentModel[] {
    return this.residentService.residents;
  }

  onResidentPick() {
    this.loadedResident = this.residentService.getResident(this.residentId)
    //this.residentId = null;
    this.isSet = true;
  }

  addPayment() {
    const body = {
      residentID: this.residentId,
      amount: this.amount,
      announced: this.announced
    }
    this.expenseService.savePayment(body).subscribe(resp => {
      console.log(resp);
    })
  }

  getBalances():  BillModel[]{
    return this.expenseService.balances;
  }
}
