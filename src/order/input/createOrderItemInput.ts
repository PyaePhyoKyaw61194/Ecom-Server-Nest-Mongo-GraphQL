import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderItemInput {
  @Field()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsNotEmpty()
  productName: string;

  @Field(() => Float)
  @IsNotEmpty()
  boughtPrice: number;

  @Field(() => Int)
  @IsNotEmpty()
  boughtQuantity: number;
}
