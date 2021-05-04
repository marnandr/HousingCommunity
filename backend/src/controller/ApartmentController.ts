import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Apartment} from "../entity/Apartment";

export class ApartmentController {

    private apartmentRepository = getRepository(Apartment);

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const apartments = await this.apartmentRepository.find();
            response.json(apartments);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            const apartment = await this.apartmentRepository.findOne(id);
            if (!apartment) {
                this.handleError(response, 404, 'No entity with the given id.');
                return;
            }
            response.json(apartment);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const entity = this.apartmentRepository.create(request.body);
            const entityAdded = await this.apartmentRepository.save(entity);
            response.json(entityAdded);
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            let apartmentToRemove = await this.apartmentRepository.findOne(id);
            await this.apartmentRepository.remove(apartmentToRemove);
            response.json({success: true});
        } catch (error) {
            console.error(error);
            this.handleError(response);
        }
    }

    handleError(response, status: number = 500, message: string = 'Server error occurred.') {
        response.status(status).json({ message });
    }
}