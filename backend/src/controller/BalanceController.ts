import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Balance} from "../entity/Balance";

export class BalanceController {

    private balanceRepository = getRepository(Balance);

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const balances = await this.balanceRepository.createQueryBuilder("balance").leftJoinAndSelect("balance.resident", "id").getMany();
            response.json(balances);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const balance = await this.balanceRepository.createQueryBuilder("balance").where("balance.resident = :id", {id: request.params.id}).leftJoinAndSelect("balance.resident", "id").getMany();
            response.json(balance);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    handleError(response, status: number = 500, message: string = 'Server error occurred.') {
        response.status(status).json({ message });
    }
}