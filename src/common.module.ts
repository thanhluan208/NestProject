import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommonServices } from './services/common.service';

const providers = [CommonServices, ConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
  imports: [],
})
export class CommonModule {}
