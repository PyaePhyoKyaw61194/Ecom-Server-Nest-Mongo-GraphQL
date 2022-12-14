import { ObjectType } from '@nestjs/graphql';
import { TagModel } from './tag.model';

@ObjectType()
export class CreateTagModel extends TagModel {}
