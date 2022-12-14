import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialMediaDataModel {
  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  profileUrl?: string;
}
