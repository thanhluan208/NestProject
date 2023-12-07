import { Module } from '@nestjs/common';
import { SocketGateWay } from './gateway';

@Module({
  imports: [SocketGateWay],
})
export class GatewayModule {}
