import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcryptjs';
import { CommonServices } from 'src/services/common.service';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { registerDataDto } from '../dtos/login.dto';
import { createUserDto } from '../dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: CommonServices,
  ) {}

  async comparePassword(inputPassword: string, hashPassword: string) {
    return await compare(inputPassword, hashPassword);
  }

  async generateJwt(id: string, role: string) {
    const payload = { id, role };

    if (payload.role === 'user') {
      return await this.jwtService.signAsync(payload, {
        secret: this.configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
      });
    }
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getEnv('AUTH_ADMIN_JWT_ACCESS_EXPIRES_IN'),
      secret: this.configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
    });
  }

  async create(createUserDto: createUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.configService.getEnv('AUTH_SALT_ROUND'));
  }
}
