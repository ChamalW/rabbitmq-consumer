import { Module } from '@nestjs/common';
import { UtilModule } from 'src/util/util.module';
import { MessageConsumerService } from './message-consumer.service';

@Module({
  providers: [MessageConsumerService],
  imports: [UtilModule],
})
export class MessageConsumerModule {}
