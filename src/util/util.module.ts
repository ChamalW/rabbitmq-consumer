import { Module } from '@nestjs/common';
import { RabbitMqUtil } from './rabbitmq-util';

@Module({
  providers: [RabbitMqUtil],
  exports: [RabbitMqUtil, UtilModule],
})
export class UtilModule {}
