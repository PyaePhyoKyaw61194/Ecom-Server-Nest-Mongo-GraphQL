import {
  InputType,
  Field,
  Int,
  registerEnumType,
  Float,
} from '@nestjs/graphql';
import { SortOrder } from 'src/enum/sortOrder.enum';

@InputType()
export class GetOrdersInput {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  statusId?: string;

  @Field({ nullable: true })
  paymentId?: string;

  @Field({ nullable: true })
  productId?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  fromOrderDate?: string;

  @Field({ nullable: true })
  toOrderDate?: string;

  @Field({ nullable: true })
  deliveredDate?: string;

  @Field(() => OrderSortBy, { nullable: true })
  orderSortBy?: OrderSortBy;

  @Field(() => SortOrder, { nullable: true })
  sortOrder?: SortOrder;
}

export enum OrderSortBy {
  ORDERCODE = 'orderCode',
  ORDERDATE = 'orderDate',
  DELIVEREDDATE = 'deliveredDate',
  PAYMENT = 'paymentType',
  TODELIVERCUSTOMER = 'toDeliverCustomer.name',
  ORDERCUSTOMER = 'orderCustomer.profile.name',
  ORDERITEMS = 'orderItems.productName',
  UpdatedAt = 'updatedAt',
}

registerEnumType(OrderSortBy, {
  name: 'OrderSortBy',
});
