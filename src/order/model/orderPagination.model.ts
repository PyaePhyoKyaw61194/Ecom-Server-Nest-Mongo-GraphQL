import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationModel } from 'src/pagination/model/pagination.model';
import { OrderModel } from './order.model';

@ObjectType()
export class orderPaginationModel extends PaginationModel {
  @Field(() => [OrderModel])
  data: OrderModel[];
}
