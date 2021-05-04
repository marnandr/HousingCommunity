import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Expense} from "../entity/Expense";
import {Resident} from "../entity/Resident";
import {Balance} from "../entity/Balance";

export class ExpenseController {

    private expenseRepository = getRepository(Expense);
    private residentRepository = getRepository(Resident);
    private balanceRepository = getRepository(Balance);

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const expenses = await this.expenseRepository.createQueryBuilder("expense").leftJoinAndSelect("expense.resident", "id").getMany();
            response.json(expenses);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //return this.expenseRepository.findOne(request.params.id);
        const id = request.params.id;
        const query = {
            id: id
        }
        try {
            const expense = await this.expenseRepository.createQueryBuilder("expense").where("expense.resident = :id", query).leftJoinAndSelect("expense.resident", "id").getMany();
            if (!expense) {
                this.handleError(response, 404, 'No entity with the given id.');
                return;
            }
            response.json(expense);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async report(request: Request, response: Response, next: NextFunction) {
        try {
            const expenses = await this.expenseRepository.createQueryBuilder("expense").where("expense.announced >= :startDate", {startDate: request.body.startDate}).andWhere("expense.announced <= :endDate", {endDate: request.body.endDate}).leftJoinAndSelect("expense.resident", "id").getMany();
            response.json(expenses);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async residentReport(request: Request, response: Response, next: NextFunction) {
        try {
            const expenses = await this.expenseRepository.createQueryBuilder("expense").where("expense.announced >= :startDate", {startDate: request.body.startDate}).andWhere("expense.announced <= :endDate", {endDate: request.body.endDate}).andWhere("expense.resident = :resident", {resident: request.params.id}).leftJoinAndSelect("expense.resident", "id").getMany();
            response.json(expenses);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async saveDivided(request: Request, response: Response, next: NextFunction) {
        let multiplier: number = request.body.amount
        let expense: any;
        let expenses: any;
        try {
            const resdients = await this.residentRepository.createQueryBuilder("resident").where("resident.apartment IS NOT NULL", {id: null}).leftJoinAndSelect("resident.apartment", "id").getMany();
            for (const resident of resdients) {
                expense = {
                    amount : Math.round(multiplier * resident.apartment.area),
                    announced : request.body.announced,
                    resident: resident.id,
                    comment: request.body.comment
                }
                expenses += expense;
                await this.expenseRepository.save(expense);
                await this.balanceRepository.createQueryBuilder("balance").update(Balance).set({amount: () => "amount" + " - " + expense.amount}).where("balance.residentId = :id", { id: resident.id }).execute();
            }
            response.json({ success: true });
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async saveUnique(request: Request, response: Response, next: NextFunction) {
        let amount: number = request.body.amount
        let divider: number = 0;
        let expense: any;
        try {
            const resdients = await this.residentRepository.createQueryBuilder("resident").where("resident.apartment IS NOT NULL", {id: null}).leftJoinAndSelect("resident.apartment", "id").getMany();
            for (const resident of resdients) {
                divider += resident.apartment.area;
            }
            divider = amount / divider;
            for (const resident of resdients) {
                expense = {
                    amount : Math.round(divider * resident.apartment.area),
                    announced : request.body.announced,
                    resident: resident.id,
                    comment: request.body.comment
                }
                await this.expenseRepository.save(expense);
                await this.balanceRepository.createQueryBuilder("balance").update(Balance).set({amount: () => "amount" + " - " + expense.amount}).where("balance.residentId = :id", { id: resident.id }).execute();
            }
            response.json({ success: true });
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    handleError(response, status: number = 500, message: string = 'Server error occurred.') {
        response.status(status).json({ message });
    }

    /*
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const entity = this.expenseRepository.create(request.body);
            const entityAdded = await this.expenseRepository.save(entity);
            response.json(entityAdded);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            let expenseToRemove = await this.expenseRepository.findOne(id);
            await this.expenseRepository.remove(expenseToRemove);
            const expenses = await this.expenseRepository.createQueryBuilder("expense").leftJoinAndSelect("expense.resident", "id").getMany();
            response.json(expenses);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }
    */
}