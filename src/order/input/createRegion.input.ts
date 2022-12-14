import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRegionInput {
  @Field()
  @IsNotEmpty()
  regionId: string;

  @Field()
  @IsNotEmpty()
  code: string;
}
