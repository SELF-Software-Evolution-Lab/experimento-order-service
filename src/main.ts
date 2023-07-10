import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MessageHandler } from './queue/service/message.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const queueService = app.get<MessageHandler>(MessageHandler);

  queueService.startListening();
}
bootstrap();
