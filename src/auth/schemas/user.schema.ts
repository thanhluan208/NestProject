import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  password: string;

  @Prop()
  accessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
