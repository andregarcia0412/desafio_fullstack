import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {

  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>
  ){}
  
  create(createExpenseDto: CreateExpenseDto) {
    return this.expenseRepository.save(createExpenseDto);
  }

  findAll() {
    return this.expenseRepository.find();
  }

  findAllByUserId(user_id: number){
    return this.expenseRepository.findBy({user_id})
  }

  findOne(id: number) {
    return this.expenseRepository.findOneBy({id});
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.expenseRepository.update(id, updateExpenseDto);
  }

  remove(id: number) {
    return this.expenseRepository.delete(id);
  }
}
