import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductModel } from './model/createProduct.model';
import { CreateProductInput } from './input/createProduct.input';
import { UpdateProductInput } from './input/updateProduct.input';
import { ProductModel } from './model/product.model';
import { GetProductsInput } from './input/getProducts.input';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => CreateProductModel)
  async createProduct(@Args('input') input: CreateProductInput) {
    return await this.productService.create(input);
  }

  @Query(() => [ProductModel])
  async products(@Args('input') input: GetProductsInput) {
    return await this.productService.findAll(input);
  }

  @Query(() => CreateProductModel)
  findProductById(@Args('id') id: string) {
    return this.productService.findById(id);
  }

  @Query(() => CreateProductModel)
  findProductByName(@Args('name') name: string) {
    return this.productService.findByName(name);
  }

  @Query(() => CreateProductModel)
  findProductByCode(@Args('code') code: string) {
    return this.productService.findByCode(code);
  }

  @Mutation(() => CreateProductModel)
  updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productService.update(input);
  }

  @Mutation(() => CreateProductModel)
  removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }
}
