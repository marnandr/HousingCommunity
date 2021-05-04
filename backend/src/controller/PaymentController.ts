import {Double, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Payment} from "../entity/Payment";
import {Resident} from "../entity/Resident"

export class PaymentController {
    private paymentRepository = getRepository(Payment);
    private residentRepository = getRepository(Resident);

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            //const payments = await this.paymentRepository.find();
            const payments = await this.paymentRepository.createQueryBuilder("payment").leftJoinAndSelect("payment.resident", "id").getMany();
            response.json(payments);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async balance(request: Request, response: Response, next: NextFunction) {
        let sum: number = 0;
        try {
            const payments = await this.paymentRepository.createQueryBuilder("payment").where("payment.resident = :id", {id: request.params.id}).getMany();
            for (const payment of payments) {
                if (payment.isIncome == true) {
                    sum += payment.amount;
                }
                else if (payment.isIncome == false) {
                    sum -= payment.amount;
                }
            }
            response.json({ balance: sum });
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async report(request: Request, response: Response, next: NextFunction) {
        try {
            const payments = await this.paymentRepository.createQueryBuilder("payment").where("payment.announced >= :startDate", {startDate: request.body.startDate}).andWhere("payment.announced <= :endDate", {endDate: request.body.endDate}).leftJoinAndSelect("payment.resident", "id").getMany();
            response.json(payments);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async residentReport(request: Request, response: Response, next: NextFunction) {
        try {
            const payments = await this.paymentRepository.createQueryBuilder("payment").where("payment.announced >= :startDate", {startDate: request.body.startDate}).andWhere("payment.announced <= :endDate", {endDate: request.body.endDate}).andWhere("payment.resident = :id", {id: request.params.id}).leftJoinAndSelect("payment.resident", "id").getMany();
            response.json(payments);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const entity = this.paymentRepository.create(request.body);
            const entityAdded = await this.paymentRepository.save(entity);
            response.json(entityAdded);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async saveDivided(request: Request, response: Response, next: NextFunction) {
        let amount: number = request.body.amount
        let divider: number = 0;
        let payment: any;
        let payments: any;
        try {
            const resdients = await this.residentRepository.createQueryBuilder("resident").where("resident.apartment IS NOT NULL", {id: null}).leftJoinAndSelect("resident.apartment", "id").getMany();
            for (const resident of resdients) {
                divider += resident.apartment.area;
            }
            divider = amount / divider;
            for (const resident of resdients) {
                payment = {
                    amount : Math.round(divider * resident.apartment.area),
                    announced : request.body.announced,
                    isIncome: request.body.isIncome,
                    resident: resident.id
                }
                payments += payment;
                await this.paymentRepository.save(payment);
            }
            response.json(payments);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            let paymentToRemove = await this.paymentRepository.findOne(id);
            await this.paymentRepository.remove(paymentToRemove);
            const payments = await this.paymentRepository.createQueryBuilder("payment").leftJoinAndSelect("payment.resident", "id").getMany();
            response.json(payments);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            const entity = this.paymentRepository.create(request.body);
            //const entityUpdated = await this.paymentRepository.;
            const entityUpdated = await this.paymentRepository.createQueryBuilder("payment").update(Payment).set(request.body).where("id = :id", { id: request.params.id }).execute();
            const payment = await this.paymentRepository.findOne(id);
            response.json(payment);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    handleError(response, status: number = 500, message: string = 'Server error occurred.') {
        response.status(status).json({ message });
    }
}