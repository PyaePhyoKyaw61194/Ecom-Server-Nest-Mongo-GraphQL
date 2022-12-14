import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SoftDeleteUserModel {
  @Field()
  message: string;
}
