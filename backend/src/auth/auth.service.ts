import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetToken } from './entities/reset-token.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { MailService } from 'src/services/mail.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    @InjectRepository(ResetToken)
    private resetTokenRepository: Repository<ResetToken>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async signIn(signInDto: SignInDto) {
    this.jwtExpirationTimeInSeconds = signInDto.rememberUser
      ? Number(this.configService.get<number>('JWT_LONG_EXPIRATION_TIME'))
      : Number(this.configService.get<number>('JWT_EXPIRATION_TIME'));
    const user = await this.userService.findOneByEmail(signInDto.email);

    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new BadRequestException('Incorrect email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.jwtExpirationTimeInSeconds,
    });

    return new AuthResponseDto(user, token, this.jwtExpirationTimeInSeconds);
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;

    await this.userService.update(user.id, { password: user.password });
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findOneByEmail(email);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (user) {
      const resetToken = nanoid(64);
      await this.resetTokenRepository.save({
        token: resetToken,
        userId: user.id,
        expiryDate: expiryDate,
      });
      await this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return { message: 'If the user exists, they will receive an email' };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    const token = await this.resetTokenRepository.findOne({
      where: {
        token: resetToken,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    const user = await this.userService.findOne(token.userId);
    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(newPassword, user.password)

    if(passwordMatch){
      throw new BadRequestException("The new password cannot be the same as the previous password")
    }
    
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userService.update(user.id, {password: user.password})

    await this.resetTokenRepository.delete({id: token.id})
  }
}
