import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusModel {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  color: string;
}
