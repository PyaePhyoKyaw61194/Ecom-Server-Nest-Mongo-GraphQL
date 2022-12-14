import { ObjectType, Field } from '@nestjs/graphql';
import { PaginationModel } from 'src/pagination/model/pagination.model';
import { TagModel } from './tag.model';

@ObjectType()
export class TagPaginationModel extends PaginationModel {
  @Field(() => [TagModel])
  data: TagModel[];
}
