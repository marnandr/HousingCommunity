import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {BillModel} from "../../models/bill-model";
import {ReportService} from "../../services/report.service";
import {ReportModel} from "../../models/report-model";
import {ExpenseModel} from "../../models/expense-model";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  residentId;
  startDate;
  endDate;
  hasReport = false;
  hasReportExpense = false;
  isIncomeEmpty = false;
  isExpenseEmpty = false;

  constructor(
    private expenseService: ExpenseService,
    private reportService: ReportService
  ) {
  }

  ngOnInit(): void {
    this.expenseService.getBalances().subscribe(resp => {
    });
  }

  getBalances(): BillModel[] {
    console.log(this.expenseService.balances);
    return this.expenseService.balances;
  }

  onResidentPick() {
    //this.residentId = null;
  }

  setAllResident(): void {
    this.residentId = null;
  }

  getReports(): ExpenseModel[]{
    return this.reportService.report;
  }

  getReportExpense(): ExpenseModel[]{
    return this.reportService.reportExpense;
  }

  onSubmit() {
    const body = {
      startDate: this.startDate,
      endDate: this.endDate
    };

    if (!this.residentId) {
      this.reportService.getAllReport(body).subscribe(resp => {
        this.hasReport = true;
        if (this.getReports().length === 0){
          this.isIncomeEmpty = true;
        }
      });
      this.reportService.getAllReportExpense(body).subscribe(resp => {
        this.hasReportExpense = true;
        if (this.getReportExpense().length === 0){
          this.isExpenseEmpty = true;
        }
      })
    } else {
      this.reportService.getOneReport(this.residentId, body).subscribe(resp => {
        this.hasReport = true;
        if (this.getReports().length === 0){
          this.isIncomeEmpty = true;
        }
      });
      this.reportService.getOneReportExpense(this.residentId, body).subscribe(resp => {
        this.hasReportExpense = true;
        if (this.getReportExpense().length === 0){
          this.isExpenseEmpty = true;
        }
      });
    }
  }

}
