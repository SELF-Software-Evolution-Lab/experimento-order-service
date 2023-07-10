export interface ISqsHandler {
  handle(messageBody: unknown): Promise<void>;
}
