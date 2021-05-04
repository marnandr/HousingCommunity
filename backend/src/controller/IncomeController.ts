import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Income} from "../entity/Income";
import {Balance} from "../entity/Balance";

export class IncomeController {

    private incomeRepository = getRepository(Income);
    private balanceRepository = getRepository(Balance);

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const incomes = await this.incomeRepository.createQueryBuilder("income").leftJoinAndSelect("income.resident", "id").getMany();
            response.json(incomes);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const income = await this.incomeRepository.createQueryBuilder("income").where("income.resident = :id", { id: request.params.id }).leftJoinAndSelect("income.resident", "id").getMany();
            if (!income) {
                this.handleError(response, 404, 'No entity with the given id.');
                return;
            }
            response.json(income);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let income = {
                amount: request.body.amount,
                announced: request.body.announced,
                resident: request.body.residentID
            }
            const entity = this.incomeRepository.create(income);
            await this.incomeRepository.save(entity);
            await this.balanceRepository.createQueryBuilder("balance").update(Balance).set({amount: () => "amount" + " + " + income.amount}).where("balance.residentId = :id", { id: income.resident }).execute();
            response.json({ success: true });
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async report(request: Request, response: Response, next: NextFunction) {
        try {
            const incomes = await this.incomeRepository.createQueryBuilder("income").where("income.announced >= :startDate", {startDate: request.body.startDate}).andWhere("income.announced <= :endDate", {endDate: request.body.endDate}).leftJoinAndSelect("income.resident", "id").getMany();
            response.json(incomes);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async residentReport(request: Request, response: Response, next: NextFunction) {
        try {
            const incomes = await this.incomeRepository.createQueryBuilder("income").where("income.announced >= :startDate", {startDate: request.body.startDate}).andWhere("income.announced <= :endDate", {endDate: request.body.endDate}).andWhere("income.resident = :resident", {resident: request.params.id}).leftJoinAndSelect("income.resident", "id").getMany();
            response.json(incomes);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    /*
    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            let incomeToRemove = await this.incomeRepository.findOne(id);
            await this.incomeRepository.remove(incomeToRemove);
            const incomes = await this.incomeRepository.createQueryBuilder("income").leftJoinAndSelect("income.resident", "id").getMany();
            response.json(incomes);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }
    */

    handleError(response, status: number = 500, message: string = 'Server error occurred.') {
        response.status(status).json({ message });
    }
}