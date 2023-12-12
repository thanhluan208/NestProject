import { IsDate, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';
import { IsValidRole } from '../decorators/role.decorator';

export class loginDataDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class registerDataDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}

export class registerGoogleDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
