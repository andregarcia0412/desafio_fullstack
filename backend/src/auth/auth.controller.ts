import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  UseGuards,
  Param,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password/:id')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('id') id: string,
  ) {
    return this.authService.changePassword(
      +id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Patch('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto.newPassword, resetPasswordDto.resetToken)
  }
}
