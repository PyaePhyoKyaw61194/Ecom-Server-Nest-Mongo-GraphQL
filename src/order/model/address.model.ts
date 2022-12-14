import { Field, ObjectType } from '@nestjs/graphql';
import { RegionModel } from './region.model';

@ObjectType()
export class AddressModel {
  @Field(() => RegionModel, { nullable: false })
  region: RegionModel;

  @Field()
  township: string;

  @Field()
  fullAddress: string;
}
