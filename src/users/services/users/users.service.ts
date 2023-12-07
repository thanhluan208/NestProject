import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dtos/createUsers.dto';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { CommonServices } from 'src/services/common.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: CommonServices,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByName(name: string): Promise<User | undefined> {
    return this.userModel.findOne({ name }).exec();
  }

  async findAndDelete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findAndUpdate(id: string, user: CreateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
