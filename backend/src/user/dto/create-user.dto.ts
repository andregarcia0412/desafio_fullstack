import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator'

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    public name: string

    @IsEmail()
    @IsNotEmpty()
    public email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    public password: string
}
