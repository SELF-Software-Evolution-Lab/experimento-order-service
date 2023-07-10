import { Injectable } from '@nestjs/common';
import { ISqsHandler } from '../interface/sqs-handler';
import { OrderService } from '../../order/service/order/order.service';
import { UpdateOrderInput } from '../../order/input/update-order-input';
import { HoldingCreatedMessage } from 'src/producer/message/order-message';
import { OrderStatus } from 'src/order/dto/order.dto/order.dto';

@Injectable()
export class HoldingCreatedHandler implements ISqsHandler {
  constructor(private readonly orderService: OrderService) {}

  public async handle(message: HoldingCreatedMessage) {
    const updateOrderInput: UpdateOrderInput = {
      orderId: message.holding.orderId,
      holdingId: message.holding.holdingId,
      completionDate: new Date(),
      state: OrderStatus.COMPLETED,
    };
    await this.orderService.updateOrder(updateOrderInput);
  }
}
