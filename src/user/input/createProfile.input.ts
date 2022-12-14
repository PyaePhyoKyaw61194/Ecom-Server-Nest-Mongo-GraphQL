import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SocialMediaData } from '../schema/socialMedia.schema';
import { SocialMediaDataInput } from './socialMedia.input';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  phone: string;

  @Field({ nullable: true })
  address: string;

  @Field(() => SocialMediaDataInput, { nullable: true })
  facebook?: SocialMediaData;
}
