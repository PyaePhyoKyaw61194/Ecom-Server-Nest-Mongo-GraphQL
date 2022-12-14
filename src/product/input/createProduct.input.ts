import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  price: number;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => [String])
  tags: string[];

  @Field()
  quantity: number;

  @Field()
  isAvailable: boolean;
}
