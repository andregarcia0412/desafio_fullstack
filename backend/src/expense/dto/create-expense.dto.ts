import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateExpenseDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    description: string

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsDateString()
    date: string

    @IsNumber()
    @IsNotEmpty()
    user_id: number
}
