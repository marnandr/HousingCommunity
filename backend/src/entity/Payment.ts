import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Resident } from './Resident'

@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    announced: Date;

    @Column()
    isIncome: Boolean;

    @ManyToOne(() => Resident, resident => resident.id)
    resident: Resident;

}