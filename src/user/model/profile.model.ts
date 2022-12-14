import { Field, ObjectType } from '@nestjs/graphql';
import { SocialMediaData } from '../schema/socialMedia.schema';
import { SocialMediaDataModel } from './socialMedia.model';

@ObjectType()
export class ProfileModel {
  @Field()
  name: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  address: string;

  @Field(() => SocialMediaDataModel, { nullable: true })
  facebook?: SocialMediaData;
}
