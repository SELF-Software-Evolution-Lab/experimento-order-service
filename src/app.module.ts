import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { ProducerModule } from './producer/producer.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    OrderModule,
    QueueModule,
    ProducerModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
