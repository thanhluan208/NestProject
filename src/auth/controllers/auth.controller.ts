import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  loginDataDto,
  registerDataDto,
  registerGoogleDto,
} from '../dtos/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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

    const token = await this.authService.generateJwt(user._id, user.name);

    return res.status(200).json({
      message: 'Login successful',
      token,
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

  // @Post('google')
  // @UsePipes(ValidationPipe)
  // async googleAuth(@Body() newUser: registerGoogleDto, @Res() res: Response) {
  //   const foundUser = await this.authService.findOneByEmail(newUser.email);

  //   const randomPassword = await this.authService.hashPassword(
  //     Math.random().toString(36).slice(-8),
  //   );

  //   if (!foundUser) {
  //     await this.authService.create({
  //       ...newUser,
  //       password: randomPassword,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //   }

  //   console.log('new', newUser);
  //   const token = await this.authService.generateJwt(
  //     newUser.name,
  //     newUser.role,
  //   );

  //   res.status(HttpStatus.OK).json({
  //     token,
  //   });
  // }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.googleLogin(req);

    res.redirect(`http://localhost:5173/callback?token=${token}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.facebookLogin(req);

    res.redirect(`http://localhost:5173/callback?token=${token}`);
  }

  @Get('logout/facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogout(@Req() req: Request) {
    req.logout((err: any) =>
      err ? console.log('err', err) : console.log('logout'),
    );
  }
}
