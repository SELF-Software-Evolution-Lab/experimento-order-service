import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MessageHandler } from './service/message.handler';
import { HoldingCreatedHandler } from './service/holding-created.handler';
import { HoldingRemovedHandler } from './service/holding-removed.handler';
import { OrderModule } from '../order/order.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [ConfigModule, OrderModule, LoggerModule],
  providers: [MessageHandler, HoldingRemovedHandler, HoldingCreatedHandler],
  exports: [MessageHandler],
})
export class QueueModule {}
