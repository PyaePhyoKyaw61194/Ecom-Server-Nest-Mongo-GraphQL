import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAddressInput } from './createAddress.input';

@InputType()
export class CreateDeliverCustomerInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field({ nullable: true })
  secondaryPhone: string;

  @Field(() => CreateAddressInput, { nullable: false })
  address: CreateAddressInput;
}
