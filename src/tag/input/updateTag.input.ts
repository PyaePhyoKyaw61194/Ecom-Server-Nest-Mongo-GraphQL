import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTagInput } from './createTag.input';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field()
  _id: string;
}
