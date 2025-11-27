import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('expense_tb')
export class Expense {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    category: string

    @Column({nullable:true})
    description: string

    @Column({type: "decimal"})
    amount: number

    @Column()
    date: Date

    @Column()
    user_id: number
}
