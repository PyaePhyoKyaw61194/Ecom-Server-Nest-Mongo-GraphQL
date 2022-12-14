import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateRegionInput } from './createRegion.input';

@InputType()
export class CreateAddressInput {
  @Field(() => CreateRegionInput, { nullable: false })
  region: CreateRegionInput;

  @Field()
  @IsNotEmpty()
  township: string;

  @Field()
  @IsNotEmpty()
  fullAddress: string;
}
