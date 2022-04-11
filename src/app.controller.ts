import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RabbitMqMessageService } from './rabbitmq-message.service';

@Controller('/rabbit-mq')
export class AppController {
  constructor(private readonly rabbitMqService: RabbitMqMessageService) {}

  @Post('/post/:channelName')
  async addMessageToQueue(@Param() channelName: any, @Body() message: any) {
    const channelNameParsed = channelName.channelName;
    await this.rabbitMqService.sendMessage(channelNameParsed, message);
  }
}
