import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { Resident } from './Resident'

@Entity()
export class Expense {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    announced: Date;

    @Column()
    comment: String;

    @ManyToOne(() => Resident, resident => resident.id)
    resident: Resident;

}