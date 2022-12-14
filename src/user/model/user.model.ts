import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileModel } from './profile.model';

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  code?: string;

  @Field(() => ProfileModel, { nullable: true })
  profile?: ProfileModel;
}
