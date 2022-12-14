import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GetUsersInput {
  @Field(() => Int, { defaultValue: 1 })
  page?: number;

  @Field({ nullable: true })
  search?: string;
}
