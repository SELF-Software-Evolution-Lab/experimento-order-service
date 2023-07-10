import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../../dto/order.dto/order.dto';
import { OrderEntity } from '../../entity/order.entity/order.entity';
import { Repository } from 'typeorm';
import { ProducerService } from '../../../producer/service/producer/producer.service';
import { MessageType } from '../../../producer/message/order-message';
import { QueryOrderInput } from '../../../order/input/query-order-input';
import { UpdateOrderInput } from '../../../order/input/update-order-input';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private producerService: ProducerService,
  ) {}
  public orders: OrderDto[] = [];

  async createOrder(order: OrderDto): Promise<OrderDto> {
    const orderEntity = await this.orderRepository.save(order);
    this.producerService.produceMessage({
      messageType: MessageType.ORDER_CREATED,
      order: orderEntity,
    });
    return orderEntity;
  }

  async getOrderById(orderId: number): Promise<OrderDto> {
    return this.orderRepository.findOneBy({ id: orderId });
  }

  async findAll(input: QueryOrderInput): Promise<OrderDto[]> {
    const query = this.orderRepository.createQueryBuilder('order');

    if (input?.accountId) {
      query.andWhere('order.accountId = :accountId', {
        accountId: input.accountId,
      });
    }

    if (input?.userId) {
      query.andWhere('order.userId = :userId', {
        userId: input.userId,
      });
    }

    if (input?.states && input?.states.length > 0) {
      query.andWhere('order.status IN (:...status)', {
        status: input.states,
      });
    }

    return query.getMany();
  }

  async updateOrder(updateOrderInput: UpdateOrderInput) {
    const order = await this.orderRepository.findOneBy({
      id: updateOrderInput.orderId,
    });

    if (updateOrderInput.holdingId) {
      order.holdingId = updateOrderInput.holdingId;
    }

    if (updateOrderInput.state) {
      order.status = updateOrderInput.state;
    }

    if (updateOrderInput.completionDate) {
      order.completionDate = updateOrderInput.completionDate;
    }

    return this.orderRepository.save(order);
  }
}
