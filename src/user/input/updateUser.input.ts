import { InputType, PartialType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './createUser.input';

@InputType()
export class updateUserInput extends PartialType(CreateUserInput) {
  @Field()
  @IsNotEmpty()
  _id: string;
}
