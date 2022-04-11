import { Injectable } from '@nestjs/common';
import { Channel } from 'amqplib';
import { RabbitMqUtil } from './util/rabbitmq-util';

@Injectable()
export class RabbitMqMessageService {
  constructor(private readonly rabbitMqUtil: RabbitMqUtil) {}

  async sendMessage(channelName: string, message: string) {
    try {
      const obj = JSON.stringify(message);
      const rabbitMqCon = await this.rabbitMqUtil.createConnection();
      const channel: Channel = await rabbitMqCon.createChannel();
      await channel.assertQueue(channelName);
      channel.sendToQueue(channelName, Buffer.from(obj));
    } catch (error) {
      console.log(error);
    }
  }
}
