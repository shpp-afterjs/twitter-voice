import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn} from "typeorm";

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text',{nullable:true})
    name: string;
}
