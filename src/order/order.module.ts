import { Module } from '@nestjs/common';
import { ControllerController } from './controller/order.controller';
import { OrderService } from './service/order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity/order.entity';
import { ProducerModule } from '../producer/producer.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), ProducerModule],
  controllers: [ControllerController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
