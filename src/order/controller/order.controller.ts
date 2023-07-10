import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderDto } from '../dto/order.dto/order.dto';
import { OrderService } from '../service/order/order.service';
import { QueryOrderInput } from '../input/query-order-input';

@Controller('orders')
export class ControllerController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: OrderDto): Promise<OrderDto> {
    return this.orderService.createOrder(order);
  }

  @Get('/:id')
  getProduct(@Param('id') id): Promise<OrderDto> {
    return this.orderService.getOrderById(id);
  }

  @Get()
  findAll(@Query() input: QueryOrderInput): Promise<OrderDto[]> {
    return this.orderService.findAll(input);
  }
}
