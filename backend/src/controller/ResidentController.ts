import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Resident} from "../entity/Resident";
import {Balance} from "../entity/Balance";

export class ResidentController {

  private residentRepository = getRepository(Resident);
  private balanceRepository = getRepository(Balance);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      //Returns with the apartments data.
      const residents = await this.residentRepository.createQueryBuilder("resident").leftJoinAndSelect("resident.apartment", "id").getMany();
      //Returns only with residents.
      //const residents = await this.residentRepository.find();
      response.json(residents);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    //return this.residentRepository.findOne(request.params.id);
    const id = request.params.id;
    try {
      const resident = await this.residentRepository.createQueryBuilder("resident").where("resident.id = :id", {id: request.params.id}).leftJoinAndSelect("resident.apartment", "id").getMany();
      //const resident = await this.residentRepository.findOne(id);
      console.info(resident);
      if (!resident) {
        this.handleError(response, 404, 'No entity with the given id.');
        return;
      }
      response.json(resident);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async living(request: Request, response: Response, next: NextFunction) {
    //return this.residentRepository.findOne(request.params.id);
    const id = request.params.id;
    try {
      const resident = await this.residentRepository.createQueryBuilder("resident").where("resident.apartment IS NOT NULL").leftJoinAndSelect("resident.apartment", "id").getMany();
      //const resident = await this.residentRepository.findOne(id);
      console.info(resident);
      if (!resident) {
        this.handleError(response, 404, 'No entity with the given id.');
        return;
      }
      response.json(resident);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      let resident = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        age: request.body.age,
        apartment: null
      }
      const entity = this.residentRepository.create(resident);
      const entityAdded = await this.residentRepository.save(entity);
      response.json(entityAdded);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async move(request: Request, response: Response, next: NextFunction) {
    try {
      this.residentRepository.createQueryBuilder().update(Resident).set({apartment: null}).where("apartment = :apartment", { apartment: request.body.apartment}).execute();
      this.residentRepository.createQueryBuilder().update(Resident).set({apartment: request.body.apartment}).where("id = :id", { id: request.body.residentID}).execute();
      if (request.body.makebalance == true) {
        let balance = {
          amount: request.body.amount,
          resident: request.body.residentID
        }
        balance = this.balanceRepository.create(balance);
        var isexist = await this.balanceRepository.createQueryBuilder("balance").where("residentId = :resident", {resident: request.body.residentID}).getOne();
        console.log(isexist);
        if (isexist == undefined) {
          this.balanceRepository.save(balance);
        }
        //const balanceEntity = this.balanceRepository.create(balance);
        //const balanceEntityAdded = await this.balanceRepository.save(balanceEntity);
        //console.log(balanceEntityAdded);
      }
      response.json({ success: true });
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  async out(request: Request, response: Response, next: NextFunction) {
    try {
      this.residentRepository.createQueryBuilder().update(Resident).set({apartment: null}).where("id = :id", { id: request.params.id}).execute();
      response.json({ success: true });
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }

  /*
  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      let residentToRemove = await this.residentRepository.findOne(id);
      await this.residentRepository.remove(residentToRemove);
      const residents = await this.residentRepository.createQueryBuilder("resident").leftJoinAndSelect("resident.apartment", "id").getMany();
      response.json(residents);
    } catch (error) {
      console.error(error);
      this.handleError(response);
    }
  }
  */

  handleError(response, status: number = 500, message: string = 'Server error occurred.') {
    response.status(status).json({message});
  }
}
