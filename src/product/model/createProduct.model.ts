import { ObjectType } from '@nestjs/graphql';
import { ProductModel } from './product.model';

@ObjectType()
export class CreateProductModel extends ProductModel {}
