import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/user/model/user.model';

@ObjectType()
export class LoginUserModel {
  @Field()
  accessToken: string;

  @Field(() => UserModel)
  user: UserModel;
}
