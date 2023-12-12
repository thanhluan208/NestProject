import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
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

  async generateJwt(id: string, name: string) {
    const payload = { id, name };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
    });

    // if (payload.role === 'user') {
    //   return await this.jwtService.signAsync(payload, {
    //     secret: this.configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
    //   });
    // }
    // return await this.jwtService.signAsync(payload, {
    //   expiresIn: this.configService.getEnv('AUTH_ADMIN_JWT_ACCESS_EXPIRES_IN'),
    //   secret: this.configService.getEnv('AUTH_JWT_ACCESS_SECRET'),
    // });
  }

  async create(createUserDto: createUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  async googleLogin(req: any) {
    const googleUser = req.user;
    if (!googleUser) {
      return {
        error: 'No user from google',
      };
    }

    const foundUser = await this.findOneByEmail(googleUser.email);

    if (foundUser) {
      const token = this.generateJwt(foundUser._id, foundUser.name);
      return token;
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await this.hashPassword(randomPassword);

      const newUser = await this.create({
        email: googleUser.email,
        name: googleUser.name,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const token = this.generateJwt(newUser._id, newUser.name);

      return token;
    }
  }

  async facebookLogin(req: any) {
    const facebookUser = req?.user;
    if (!facebookUser) {
      return {
        error: 'No user from facebook',
      };
    }

    const foundUser = await this.findOneByEmail(facebookUser.email);

    if (foundUser) {
      const token = this.generateJwt(foundUser._id, foundUser.name);
      return token;
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await this.hashPassword(randomPassword);

      const newUser = await this.create({
        email: facebookUser.email,
        name: facebookUser.name,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        accessToken: facebookUser.accessToken,
      });

      const token = this.generateJwt(newUser._id, newUser.name);

      return token;
    }
  }
}
