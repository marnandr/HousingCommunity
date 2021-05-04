import {UserController} from "./controller/UserController";
import {ApartmentController} from "./controller/ApartmentController";
import {ExpenseController} from "./controller/ExpenseController";
import {IncomeController} from "./controller/IncomeController";
import {ResidentController} from "./controller/ResidentController";
import {PaymentController} from "./controller/PaymentController";
import {BalanceController} from "./controller/BalanceController";

export const Routes = [
{
    method: "get",
    route: "/apartments",
    controller: ApartmentController,
    action: "all"
},
{
    method: "get",
    route: "/apartments/:id",
    controller: ApartmentController,
    action: "one"
},
{
    method: "get",
    route: "/moved-apartments",
    controller: ResidentController,
    action: "living"
},
{
    method: "post",
    route: "/save-apartment",
    controller: ApartmentController,
    action: "save"
},
{
    method: "delete",
    route: "/delete-apartment/:id",
    controller: ApartmentController,
    action: "remove"
},
{
    method: "get",
    route: "/residents",
    controller: ResidentController,
    action: "all"
},
{
    method: "get",
    route: "/residents/:id",
    controller: ResidentController,
    action: "one"
},
{
    method: "post",
    route: "/save-resident",
    controller: ResidentController,
    action: "save"
},
{
    method: "post",
    route: "/move-resident",
    controller: ResidentController,
    action: "move"
},
{
    method: "post",
    route: "/out-resident/:id",
    controller: ResidentController,
    action: "out"
},
{
    method: "get",
    route: "/expenses",
    controller: ExpenseController,
    action: "all"
},
{
    method: "get",
    route: "/expenses/:id",
    controller: ExpenseController,
    action: "one"
},
{
    method: "post",
    route: "/report-expense",
    controller: ExpenseController,
    action: "report"
},
{
    method: "post",
    route: "/report-expense/:id",
    controller: ExpenseController,
    action: "residentReport"
},
{
    method: "post",
    route: "/divided-expense",
    controller: ExpenseController,
    action: "saveDivided"
},
{
    method: "post",
    route: "/unique-expense",
    controller: ExpenseController,
    action: "saveUnique"
},
{
    method: "get",
    route: "/incomes",
    controller: IncomeController,
    action: "all"
},
{
    method: "get",
    route: "/incomes/:id",
    controller: IncomeController,
    action: "one"
},
{
    method: "post",
    route: "/report-income",
    controller: IncomeController,
    action: "report"
},
{
    method: "post",
    route: "/report-income/:id",
    controller: IncomeController,
    action: "residentReport"
},
{
    method: "post",
    route: "/save-income",
    controller: IncomeController,
    action: "save"
},
{
    method: "get",
    route: "/get-balance",
    controller: BalanceController,
    action: "all"
},
{
    method: "get",
    route: "/get-balance/:id",
    controller: BalanceController,
    action: "one"
},
/*
Retired routes:
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
{
    method: "post",
    route: "/save-expense",
    controller: ExpenseController,
    action: "save"
},
{
    method: "delete",
    route: "/delete-expense/:id",
    controller: ExpenseController,
    action: "remove"
},
{
    method: "delete",
    route: "/delete-income/:id",
    controller: IncomeController,
    action: "remove"
},
{
    method: "get",
    route: "/payments",
    controller: PaymentController,
    action: "all"
},
{
    method: "get",
    route: "/balance-payment/:id",
    controller: PaymentController,
    action: "balance"
},
{
    method: "post",
    route: "/save-payment",
    controller: PaymentController,
    action: "save"
},
{
    method: "delete",
    route: "/delete-payment/:id",
    controller: PaymentController,
    action: "delete"
},
{
    method: "post",
    route: "/update-payment/:id",
    controller: PaymentController,
    action: "update"
},
{
    method: "get",
    route: "/divided-payment",
    controller: PaymentController,
    action: "saveDivided"
},
{
    method: "get",
    route: "/report-payment",
    controller: PaymentController,
    action: "report"
},
{
    method: "get",
    route: "/report-payment/:id",
    controller: PaymentController,
    action: "residentReport"
},
{
    method: "delete",
    route: "/delete-resident/:id",
    controller: ResidentController,
    action: "remove"
},
*/
];
