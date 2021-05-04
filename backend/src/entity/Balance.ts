import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Resident } from './Resident'

@Entity()
export class Balance {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @OneToOne(type => Resident, resident => resident.id, {nullable: true})
    @JoinColumn()
    resident: Resident;

}