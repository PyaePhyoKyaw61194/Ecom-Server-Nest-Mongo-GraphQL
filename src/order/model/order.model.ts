import { Field, Float, ObjectType } from '@nestjs/graphql';
import { TagModel } from 'src/tag/model/tag.model';
import { UserModel } from 'src/user/model/user.model';
import { OrderItemModel } from './orderItem.model';
import { StatusModel } from './status.model';
import { ToDeliverCustomerModel } from './toDeliverCustomer.model';

@ObjectType()
export class OrderModel {
  @Field()
  _id: string;

  @Field()
  paymentType: string;

  @Field()
  orderCode: string;

  @Field()
  orderDate: Date;

  @Field({ nullable: true })
  deliveredDate: Date;

  @Field({ nullable: true })
  customerRemark: string;

  @Field({ nullable: true })
  internalRemark: string;

  @Field(() => Float, { nullable: true })
  deliveryFee: number;

  @Field(() => Float, { nullable: true })
  discountFee: number;

  @Field(() => StatusModel, { nullable: false })
  status: StatusModel;

  @Field(() => [TagModel], { nullable: 'itemsAndList' })
  tags: TagModel[];

  @Field(() => UserModel, { nullable: false })
  orderCustomer: UserModel;

  @Field(() => ToDeliverCustomerModel, { nullable: false })
  toDeliverCustomer: ToDeliverCustomerModel;

  @Field(() => [OrderItemModel], { nullable: false })
  orderItems: OrderItemModel[];
}
