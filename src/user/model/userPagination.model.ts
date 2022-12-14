import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationModel } from 'src/pagination/model/pagination.model';
import { UserModel } from './user.model';

@ObjectType()
export class UserPaginationModel extends PaginationModel {
  @Field(() => [UserModel])
  data: UserModel[];
}
