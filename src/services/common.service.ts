import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonServices {
  private logger = new Logger(CommonServices.name);
  constructor(private configService: ConfigService) {}

  getEnv(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      this.logger.error(`Missing env variable: ${key}`);
      throw new Error(`Missing env variable: ${key}`);
    }
    return value;
  }
}
