import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Apartment } from './Apartment'

@Entity()
export class Resident {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToOne(type => Apartment, apartment => apartment.id, {nullable: true})
    @JoinColumn()
    apartment: Apartment;

}
