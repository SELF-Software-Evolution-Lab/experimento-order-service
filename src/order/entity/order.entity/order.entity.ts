import { OrderStatus, OrderType } from '../../dto/order.dto/order.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  accountId: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  quoteId: string;

  @Column({ nullable: true })
  holdingId: string;

  @Column({
    type: 'enum',
    enum: OrderType,
    nullable: false,
  })
  type: OrderType;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'real', nullable: false })
  price: number;

  @Column({ type: 'real', nullable: false })
  orderFee: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN,
    nullable: false,
  })
  status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp' })
  openDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completionDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
