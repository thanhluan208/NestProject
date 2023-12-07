import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { loginDataDto, registerDataDto } from '../dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginData: loginDataDto, @Res() res: Response) {
    const { email, password } = loginData;

    const user = await this.authService.findOneByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordValid = await this.authService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

    const token = await this.authService.generateJwt(user._id, user.role);

    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    });
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() newUser: registerDataDto, @Res() res: Response) {
    const foundUser = await this.authService.findOneByEmail(newUser.email);

    if (foundUser) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'User already exists',
      });
    }

    const userPassword = await this.authService.hashPassword(newUser.password);

    await this.authService.create({
      ...newUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: userPassword,
    });

    return res.status(HttpStatus.OK).json({
      message: 'User registered successfully',
    });
  }
}
