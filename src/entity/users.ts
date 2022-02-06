import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 255})
    name: string;

    @Column("varchar", {length: 255})
    lastname: string;

    @Column("varchar", {length: 6})
    gender: "male" | "female";

    @Column("varchar", {length: 200})
    birthday: string;

    @Column("varchar", {length: 200})
    email: string;

    @Column("text")
    password: string;

    @Column("varchar", {length: 200})
    salt: string;

    @Column("varchar", {length: 15})
    ip: string;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: string;
}
