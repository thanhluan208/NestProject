import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Query } from 'src/Decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('findByName')
  async getUserByName(@Query() query: { name: string }, @Res() res: Response) {
    const { name } = query;

    const user = await this.usersService.findOneByName(name);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    return res.status(HttpStatus.OK).json(user);
  }
}
