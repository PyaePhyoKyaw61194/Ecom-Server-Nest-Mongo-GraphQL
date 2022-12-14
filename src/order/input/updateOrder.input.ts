import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateDeliverCustomerInput } from './createDeliverCustomer.input';

@InputType()
export class UpdateOrderInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  _id: string;

  @Field({ nullable: true })
  orderDate?: Date;

  @Field({ nullable: true })
  deliveredDate?: Date;

  // TODO: IsString() Check
  @Field({ nullable: true })
  paymentType?: string;

  @Field({ nullable: true })
  customerRemark?: string;

  @Field({ nullable: true })
  internalRemark?: string;

  @Field(() => Float, { nullable: true })
  deliveryFee: number;

  @Field(() => Float, { nullable: true })
  discountFee: number;

  @Field({ nullable: true })
  status?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  tags: string[];

  @Field(() => CreateDeliverCustomerInput, { nullable: true })
  toDeliverCustomer?: CreateDeliverCustomerInput;

  /*   @Field(() => [CreateOrderItemInput])
  orderItems: CreateOrderItemInput[]; */

  // @Field({ nullable: false })
  // @IsNotEmpty()
  // orderCustomer: string;
}
