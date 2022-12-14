import { Field, ObjectType } from '@nestjs/graphql';
import { AddressModel } from './address.model';

@ObjectType()
export class ToDeliverCustomerModel {
  @Field()
  name: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  secondaryPhone: string;

  @Field(() => AddressModel, { nullable: false })
  address: AddressModel;
}
