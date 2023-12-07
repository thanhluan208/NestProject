import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(ValidateUserMiddleware)
    //   .exclude({
    //     path: 'users/register',
    //     method: RequestMethod.POST,
    //   })
    //   .forRoutes(UsersController);
  }
}
