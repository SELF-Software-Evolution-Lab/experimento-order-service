import { Injectable } from '@nestjs/common';
import { ISqsHandler } from '../interface/sqs-handler';
import { HoldingRemovedMessage } from '../../producer/message/order-message';
import { UpdateOrderInput } from '../../order/input/update-order-input';
import { OrderStatus } from '../../order/dto/order.dto/order.dto';
import { OrderService } from '../../order/service/order/order.service';

@Injectable()
export class HoldingRemovedHandler implements ISqsHandler {
  constructor(private readonly orderService: OrderService) {}

  public async handle(message: HoldingRemovedMessage) {
    const updateOrderInput: UpdateOrderInput = {
      orderId: message.holding.orderId,
      completionDate: new Date(),
      state: OrderStatus.COMPLETED,
    };
    await this.orderService.updateOrder(updateOrderInput);
  }
}
