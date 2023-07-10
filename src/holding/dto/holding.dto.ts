import { IsNumber, IsUUID } from 'class-validator';

export class HoldingDto {
  @IsNumber()
  orderId: number;

  @IsUUID()
  holdingId: string;
}
