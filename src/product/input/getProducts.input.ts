import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { SortOrder } from 'src/enum/sortOrder.enum';

@InputType()
export class GetProductsInput {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  tagId?: string;

  @Field(() => ProductSortBy, { nullable: true })
  sortBy?: ProductSortBy;

  @Field(() => SortOrder, { nullable: true })
  sortOrder?: SortOrder;
}

// export enum SortOrder {
//   ASC = 'asc',
//   DESC = 'desc',
// }

// registerEnumType(SortOrder, {
//   name: 'SortOrder',
// });

export enum ProductSortBy {
  NAME = 'name',
  PRICE = 'price',
  QUANTITY = 'quantity',
  IsAvailable = 'isAvailable',
  UpdatedAt = 'updatedAt',
}

registerEnumType(ProductSortBy, {
  name: 'ProductSortBy',
});
