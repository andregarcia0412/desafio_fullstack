import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Exclude } from 'class-transformer'

@Entity('user_tb')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique:true})
    email: string

    @Column()
    @Exclude()
    password: string
}
