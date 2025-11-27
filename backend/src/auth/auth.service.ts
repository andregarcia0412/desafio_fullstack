import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number
    
    constructor(
        private userService: UserService, 
        private jwtService: JwtService,
        private configService: ConfigService
    ){}

    async signIn(signInDto: SignInDto){
        this.jwtExpirationTimeInSeconds = signInDto.rememberUser ? Number(this.configService.get<number>('JWT_LONG_EXPIRATION_TIME')) : Number(this.configService.get<number>('JWT_EXPIRATION_TIME'))
        const user = await this.userService.findOneByEmail(signInDto.email)

        if(!user || !(await bcrypt.compare(signInDto.password, user.password))){            
            throw new BadRequestException("Incorrect email or password")
        }

        const payload = {sub: user.id, email: user.email}
        const token = this.jwtService.sign(payload, {
            expiresIn: this.jwtExpirationTimeInSeconds
        })

        return new AuthResponseDto(user, token, this.jwtExpirationTimeInSeconds)
    }
}
