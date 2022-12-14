import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleModel {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
