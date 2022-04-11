import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RabbitMqMessageService } from './rabbitmq-message.service';
import { UtilModule } from './util/util.module';
import { MessageConsumerModule } from './message-consumer/message-consumer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [UtilModule, MessageConsumerModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [RabbitMqMessageService],
})
export class AppModule {}
