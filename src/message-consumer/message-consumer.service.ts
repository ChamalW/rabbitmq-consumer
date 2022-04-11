import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Channel, ConsumeMessage } from 'amqplib';
import { CronJob } from 'cron';
import { RabbitMqUtil } from 'src/util/rabbitmq-util';

@Injectable()
export class MessageConsumerService {
  constructor(
    private readonly rabbitMqUtil: RabbitMqUtil,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
  consumer =
    (channel: Channel) =>
    (msg: ConsumeMessage | null): any => {
      if (msg) {
        channel.ack(msg);
        console.log('$$$$$$$$$$$ START OF CONSUMER $$$$$$$$$$$$$$$$');
        console.log(msg.content.toString());
        console.log('$$$$$$$$$$$ END OF CONSUMER $$$$$$$$$$$$$$$$');
      }
    };

  @Cron(CronExpression.EVERY_MINUTE)
  async messageConsumer() {
    const channelName = 'StyleQueue';
    const connection = await this.rabbitMqUtil.createConnection();
    const channel: Channel = await connection.createChannel();
    await channel.consume(channelName, this.consumer(channel));
  }

  messageCosumerCron(
    name: string,
    cronExpression: string,
    processor?: Function,
  ) {
    const job = new CronJob(cronExpression, async () => {
      const channelName = 'StyleQueue';
      const connection = await this.rabbitMqUtil.createConnection();
      const channel: Channel = await connection.createChannel();
      await channel.consume(channelName, this.consumer(channel));
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }
}
