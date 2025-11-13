import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    ){
        this.jwtExpirationTimeInSeconds = Number(this.configService.get<number>('JWT_EXPIRATION_TIME'))
    }

    async signIn(signInDto: SignInDto){
        const user = await this.userService.findOneByEmail(signInDto.email)

        if(!user){            
            throw new UnauthorizedException()
        }

        const isRightPassword = await bcrypt.compare(signInDto.password, user.password)

        if(!isRightPassword){
            throw new UnauthorizedException()
        }

        const payload = {sub: user.id, email: user.email}
        const token = this.jwtService.sign(payload)

        return new AuthResponseDto(token, this.jwtExpirationTimeInSeconds)
    }
}
