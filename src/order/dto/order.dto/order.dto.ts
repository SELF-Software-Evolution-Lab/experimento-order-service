import { IsDate, IsEnum, IsNumber, IsUUID } from 'class-validator';

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  OPEN = 'OPEN',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED',
}

export class OrderDto {
  @IsNumber()
  id: number;

  @IsUUID()
  accountId: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  quoteId: string;

  @IsUUID()
  holdingId: string;

  @IsEnum(OrderType)
  type: OrderType;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  orderFee: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsDate()
  openDate: Date;

  @IsDate()
  completionDate: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
