import { DateScalarMode, Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateDeliverCustomerInput } from './createDeliverCustomer.input';
import { CreateOrderItemInput } from './createOrderItemInput';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsNotEmpty()
  paymentType: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  orderDate: DateScalarMode;

  @Field({ nullable: true })
  deliveredDate?: DateScalarMode;

  @Field({ nullable: true })
  customerRemark?: string;

  @Field({ nullable: true })
  internalRemark?: string;

  @Field(() => Float, { nullable: true })
  deliveryFee: number;

  @Field(() => Float, { nullable: true })
  discountFee: number;

  @Field({ nullable: false })
  @IsNotEmpty()
  status: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  tags: string[];

  @Field({ nullable: false })
  @IsNotEmpty()
  orderCustomer: string;

  @Field(() => CreateDeliverCustomerInput, { nullable: false })
  toDeliverCustomer: CreateDeliverCustomerInput;

  @Field(() => [CreateOrderItemInput])
  orderItems: CreateOrderItemInput[];
}
