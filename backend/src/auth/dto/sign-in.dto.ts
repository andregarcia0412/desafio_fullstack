import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator'

export class SignInDto{
    
    @IsEmail()
    @IsNotEmpty()
    public email: string

    @IsString()
    @IsNotEmpty()
    public password: string

    @IsBoolean()
    public rememberUser: boolean
}