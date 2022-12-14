import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TagModel {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  deletedAt?: Date;
}
