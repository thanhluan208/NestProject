import {
  IsEmail,
  IsNumberString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  age?: number;

  @IsNotEmpty()
  password: string;
}
