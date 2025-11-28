import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message: 'Use upper/lowercase, numbers, and symbols.',
  })
  oldPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message: 'Use upper/lowercase, numbers, and symbols.',
  })
  newPassword: string;
}
