import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationModel {
  @Field({ nullable: true })
  total?: number;
}
