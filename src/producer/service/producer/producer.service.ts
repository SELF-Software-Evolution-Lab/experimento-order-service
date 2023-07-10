import { Injectable } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { ConfigService } from '../../../config/service/config/config.service';
import { OrderCreatedMessage } from '../../message/order-message';
import { LoggerService } from '../../../logger/logger/logger.service';

type OrderMessage = OrderCreatedMessage;
@Injectable()
export class ProducerService {
  sns: SNS;
  topicArn: string;

  constructor(
    private readonly loggerService: LoggerService,
    configService: ConfigService,
  ) {
    this.sns = new SNS({
      region: configService.getAwsRegion(),
      credentials: {
        accessKeyId: configService.getAwsAccessKey(),
        secretAccessKey: configService.getAwsSecret(),
      },
    });
    this.topicArn = configService.getAwsSnsOrigin();
  }

  produceMessage(orderMessage: OrderMessage) {
    this.sns.publish(
      { TopicArn: this.topicArn, Message: JSON.stringify(orderMessage) },
      (err, data) => {
        if (err) {
          this.loggerService.error(`Error publishing message`, err.message);
        } else {
          this.loggerService.log(
            `Message published successfully:${data.MessageId}`,
          );
        }
      },
    );
  }
}
