import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../dto/order.dto/order.dto';

export class QueryOrderInput {
  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(OrderStatus, { each: true })
  states?: OrderStatus[];
}
