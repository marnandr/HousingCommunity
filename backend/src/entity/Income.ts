import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Resident } from './Resident'

@Entity()
export class Income {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    announced: Date;

    @ManyToOne(() => Resident, resident => resident.id)
    resident: Resident;

}