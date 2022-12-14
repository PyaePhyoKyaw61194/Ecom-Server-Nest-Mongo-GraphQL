import { ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType()
export class CreateUserModel extends UserModel {}
