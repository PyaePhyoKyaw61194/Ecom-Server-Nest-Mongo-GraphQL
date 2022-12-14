import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateProfileInput } from 'src/user/input/createProfile.input';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  code: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => CreateProfileInput)
  profile: CreateProfileInput;

  @Field({ nullable: true })
  role: string;
}
