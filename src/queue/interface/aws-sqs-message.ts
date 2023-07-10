export interface AwsSqsMessage {
  Type: string;
  MessageId: string;
  TopicArn: string;
  Message: string;
}
