import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegionModel {
  @Field()
  regionId: string;

  @Field()
  code: string;
}
