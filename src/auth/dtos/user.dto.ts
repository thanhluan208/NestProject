import { IsDate } from 'class-validator';
import { registerDataDto } from './login.dto';

export class createUserDto extends registerDataDto {
  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
