import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Apartment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    floor: number;

    @Column()
    door: number;

    @Column()
    area: number;

    @Column()
    airspace: number;

}
