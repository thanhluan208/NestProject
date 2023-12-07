import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id: string;

  @Prop()
  name: string;

  age: number;

  @Prop()
  email: string;

  createdAt: Date;

  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
