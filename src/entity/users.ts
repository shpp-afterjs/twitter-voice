import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn} from "typeorm";

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    gender: "male" | "female";

    @Column()
    birthday: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    ip: string;

    @Column()
    dateLastAdd: string;

    @Column()
    dateLastUpdate: string;

    @Column()
    dateCreateAccount: string;


}
