import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateOrderItemInput } from './createOrderItemInput';

@InputType()
export class UpdateOrderItemsInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  orderId: string;

  @Field(() => [CreateOrderItemInput], { nullable: false })
  orderItems: CreateOrderItemInput[];
}
