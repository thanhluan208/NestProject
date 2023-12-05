import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/createUsers.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const user = this.usersService.findUser(id);
    if (user) {
      res.send(user);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'User not found' });
    }
  }

  @Get()
  getAllUsers(@Res() res: Response) {
    res.send(this.usersService.getAllUsers());
  }

  @Post('create')
  createUser(@Body() newUserData: CreateUserDto, @Res() res: Response) {
    console.log('new', newUserData);
    this.usersService.createCustomer(newUserData);
    res.send({ message: 'User created successfully' });
  }
}
