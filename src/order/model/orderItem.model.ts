import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { TagModel } from 'src/tag/model/tag.model';

@ObjectType()
export class OrderItemModel {
  @Field({ nullable: false })
  productId: string;

  @Field({ nullable: false })
  productName: string;

  @Field(() => Float, { nullable: false })
  boughtPrice: number;

  @Field(() => Int, { nullable: false })
  boughtQuantity: number;

  @Field(() => [TagModel])
  tags: TagModel[];
}
