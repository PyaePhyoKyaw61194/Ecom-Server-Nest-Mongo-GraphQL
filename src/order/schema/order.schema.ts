import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';
import { toDeliverCustomer } from './toDeliverCustomer.schema';
import { Setting } from 'src/setting/schema/setting.schema';
import { OrderItem } from './orderItem.schema';
import { Tag } from 'src/tag/schema/tag.schema';

export type OrderDocument = Order & mongoose.Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  paymentType: string;

  @Prop({ required: true })
  orderCode: string;

  @Prop({ required: true })
  orderDate: Date;

  @Prop({ required: false })
  deliveredDate: Date;

  @Prop({ required: false })
  customerRemark: string;

  @Prop({ required: false })
  internalRemark: string;

  @Prop({ required: false })
  deliveryFee: number;

  @Prop({ required: false })
  discountFee: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Setting.name,
    required: true,
  })
  status: Setting; // to change to id

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  orderCustomer: User;

  @Prop({
    type: toDeliverCustomer,
    ref: toDeliverCustomer.name,
    required: true,
  })
  toDeliverCustomer: toDeliverCustomer;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }],
    required: false,
  })
  tags: Tag[];

  @Prop({
    required: true,
  })
  orderItems: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
