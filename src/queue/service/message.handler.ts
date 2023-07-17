import { Injectable } from '@nestjs/common';
import {
  DaytraderMessage,
  MessageType,
} from '../../producer/message/order-message';
import { ISqsHandler } from '../interface/sqs-handler';
import { HoldingRemovedHandler } from './holding-removed.handler';
import { HoldingCreatedHandler } from './holding-created.handler';
import { AwsSqsMessage } from '../interface/aws-sqs-message';
import { SQS } from 'aws-sdk';
import { ConfigService } from '../../config/service/config/config.service';
import { LoggerService } from '../../logger/logger/logger.service';

type MessageTypes = MessageType;

@Injectable()
export class MessageHandler {
  private sqs: SQS;
  private queueUrl: string;
  private readonly handlers = new Map<MessageTypes, ISqsHandler>();

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly holdingCreatedHandler: HoldingCreatedHandler,
    private readonly holdingRemovedHandler: HoldingRemovedHandler,
  ) {
    this.sqs = new SQS({
      accessKeyId: this.configService.getAwsAccessKey(),
      secretAccessKey: this.configService.getAwsSecret(),
      region: this.configService.getAwsRegion(),
      sessionToken: this.configService.getAwsSessionToken(),
    });

    this.queueUrl = this.configService.getAwsSqsArn();

    this.initHandlers();
  }

  async startListening() {
    const params = {
      QueueUrl: this.queueUrl,
      WaitTimeSeconds: 20,
      MaxNumberOfMessages: 1,
    };

    while (true) {
      const response = await this.sqs.receiveMessage(params).promise();
      const messages = response.Messages;

      if (messages && messages.length > 0) {
        for (const message of messages) {
          await this.processMessage(JSON.parse(message.Body));
          await this.deleteMessage(message.ReceiptHandle);
        }
      }
    }
  }

  async deleteMessage(receiptHandle: string) {
    const params = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    };

    await this.sqs.deleteMessage(params).promise();
  }

  public async processMessage(awsSqsMessage: AwsSqsMessage): Promise<void> {
    const daytraderMessage = JSON.parse(
      awsSqsMessage.Message,
    ) as DaytraderMessage;

    const handler = this.handlers.get(daytraderMessage.messageType);
    if (handler) {
      this.logger.log(`Handling message ${daytraderMessage.messageType}`);
      await handler.handle(JSON.parse(awsSqsMessage.Message));
    } else {
      this.logger.log(`Ignored message type ${daytraderMessage.messageType}`);
    }
  }

  private initHandlers() {
    this.handlers.set(MessageType.HOLDING_CREATED, this.holdingCreatedHandler);
    this.handlers.set(MessageType.HOLDING_REMOVED, this.holdingRemovedHandler);
  }
}
