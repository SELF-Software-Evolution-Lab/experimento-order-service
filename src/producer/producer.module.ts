import { Module } from '@nestjs/common';
import { ProducerService } from './service/producer/producer.service';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
