import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../dto/order.dto/order.dto';

export class UpdateOrderInput {
  @IsString()
  orderId: number;

  @IsOptional()
  @IsString()
  holdingId?: string;

  @IsOptional()
  @IsDate()
  completionDate?: Date;

  @IsOptional()
  @IsEnum(OrderStatus)
  state?: OrderStatus;
}
