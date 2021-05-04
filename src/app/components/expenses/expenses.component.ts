import {Component, OnInit} from '@angular/core';
import {ExpenseModel} from "../../models/expense-model";
import {HousesService} from "../../services/houses.service";
import {ResidentService} from "../../services/resident.service";
import {ExpenseService} from "../../services/expense.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expense: ExpenseModel = new ExpenseModel();
  isCommonExpense = false;
  isDifferentExpense = false;
  loadedHouses: any
  calculatedPrice = []
  isCalculated = false;
  isUnique: boolean;
  announced;

  constructor(
    private houseService: HousesService,
    private residentService: ResidentService,
    private expenseService: ExpenseService
  ) {
  }

  ngOnInit(): void {
    this.houseService.getHouses().subscribe(resp => {
    })
  }

  onSubmit() {
    if (this.isUnique) {
      this.expenseService.saveUniqueExpense(this.expense).subscribe(resp => {
        console.log(resp);
      })
    } else {
      this.expenseService.saveCommonExpense(this.expense).subscribe(resp => {
        console.log(resp);
      })
    }
  }

  getHouses() {
    return this.houseService.houses;
  }

  onReview(isUnique: boolean) {
    this.isUnique = isUnique;
    if (this.isUnique) {
      this.calculateUnique();
    } else {
      this.calculateCommon()
    }
  }

  calculateUnique() {
    let calculatedObject = [];
    const count = this.getHouses().length;
    const calculatedAmount = Math.floor(this.expense.amount / count);
    this.getHouses().forEach(obj => {
      calculatedObject.push({
        floor: obj.floor,
        door: obj.door,
        price: calculatedAmount
      });
    })
    this.calculatedPrice = calculatedObject;
    this.isCalculated = true
  }
  //updatelj 

  calculateCommon() {
    let calculatedObject = [];
    const count = this.getHouses().length;
    let sumArea = 0;

    this.getHouses().forEach(obj => {
      sumArea += obj.area;
    })

    const unitPrice = this.expense.amount / sumArea;

    this.getHouses().forEach(obj => {
      calculatedObject.push({
        floor: obj.floor,
        door: obj.door,
        price: Math.floor(obj.area * unitPrice)
      })
    })
    this.calculatedPrice = calculatedObject;
    this.isCalculated = true
  }

  onCommonExpense() {
    this.isCalculated = false;
    this.isCommonExpense = !this.isCommonExpense;
    this.isDifferentExpense = false;
    this.expense = new ExpenseModel();
  }

  onDifferentExpense() {
    this.isCalculated = false;
    this.isDifferentExpense = !this.isDifferentExpense;
    this.isCommonExpense = false;
  }

}
