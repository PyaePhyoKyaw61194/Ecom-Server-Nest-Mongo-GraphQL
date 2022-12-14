import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class SocialMediaDataInput {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(50)
  userName: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(150)
  userId: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(300)
  profileUrl: string;
}
