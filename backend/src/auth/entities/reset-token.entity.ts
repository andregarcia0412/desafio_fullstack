import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reset_token_tb')
export class ResetToken {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: string;

  @Column()
  userId: number;

  @Column()
  expiryDate: Date;
}
