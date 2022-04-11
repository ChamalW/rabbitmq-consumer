/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import client, { Channel, connect, Connection } from 'amqplib';
const amqp = require('amqplib/callback_api');

@Injectable()
export class RabbitMqUtil {
  async createConnection() {
    const connection: Connection = await connect(
      'amqp://username:password@localhost:5672',
    );
    return connection;
  }

  async createCallBackConnection(): Promise<any> {
    amqp.connect(
      'amqp://username:password@localhost:5672',
      function (err, conn) {
        console.log('[AMQP] connected');
        return conn;
      },
    );
  }
}
