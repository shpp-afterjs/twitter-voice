import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number;

    @Column('text', { nullable: true })
      name: string;
}
