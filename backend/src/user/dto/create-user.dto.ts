import { IsString, IsEmail, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator'

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    public name: string

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    public email: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
        message: "Use upper/lowercase, numbers, and symbols.",
    })
    public password: string
}
