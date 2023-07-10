import { HoldingDto } from '../../holding/dto/holding.dto';
import { OrderDto } from '../../order/dto/order.dto/order.dto';

export enum MessageType {
  ORDER_CREATED = 'ORDER_CREATED',
  HOLDING_CREATED = 'HOLDING_CREATED',
  HOLDING_REMOVED = 'HOLDING_REMOVED',
}
export class DaytraderMessage {
  messageType: MessageType;
}

export class OrderCreatedMessage extends DaytraderMessage {
  order: OrderDto;
}

export class HoldingCreatedMessage extends DaytraderMessage {
  holding: HoldingDto;
}

export class HoldingRemovedMessage extends DaytraderMessage {
  holding: HoldingDto;
}
