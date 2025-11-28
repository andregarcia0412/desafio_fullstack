import { IsString, Matches, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  resetToken: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message: 'Use upper/lowercase, numbers, and symbols.',
  })
  newPassword: string;
}
