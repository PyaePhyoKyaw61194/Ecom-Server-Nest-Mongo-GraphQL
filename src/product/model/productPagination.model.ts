import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationModel } from 'src/pagination/model/pagination.model';
import { ProductModel } from './product.model';

@ObjectType()
export class ProductPaginationModel extends PaginationModel {
  @Field(() => [ProductModel])
  data: ProductModel[];
}
