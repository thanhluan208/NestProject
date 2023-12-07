import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongooseActionServices<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(createUserDto: any): Promise<T> {
    const createdUser = new this.model(createUserDto);
    return createdUser.save();
  }

  async findOneByName(name: string): Promise<T | undefined> {
    return this.model.findOne({ name });
  }

  async findAndDelete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async findAndUpdate(id: string, user: any): Promise<T> {
    return this.model.findByIdAndUpdate(id, user, { new: true });
  }
}
