import { ObjectType, Field } from '@nestjs/graphql';
import { TagModel } from 'src/tag/model/tag.model';

@ObjectType()
export class ProductModel {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  price: number;

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field(() => [TagModel])
  tags: TagModel[];

  @Field()
  quantity: number;

  @Field()
  isAvailable: boolean;
}
