import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
const dbConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      uri: 'mongodb://127.0.0.1:27017/Hanger',
      // auth: {
      //   username: configService.getEnv('MONGO_USERNAME'),
      //   password: configService.getEnv('MONGO_PASSWORD'),
      // }
    };
  },
});
@Module({
  imports: [dbConfig],
  exports: [dbConfig],
})
export class DatabaseModule {}
