import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationInput } from 'src/pagination/input/pagination.input';
import { UserModel } from 'src/user/model/user.model';
import { CreateOrderInput } from './input/createOrder.input';
import { GetOrdersInput } from './input/getOrders.input';
import { UpdateOrderInput } from './input/updateOrder.input';
import { UpdateOrderItemsInput } from './input/updateOrderItemsinput';
import { OrderModel } from './model/order.model';
import { orderPaginationModel } from './model/orderPagination.model';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolover {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderModel)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Args('input') input: CreateOrderInput,
    @CurrentUser() user: any,
  ) {
    return await this.orderService.create(input, user);
  }

  // @Query(() => orderPaginationModel)
  // async orders(@Args('input') input: PaginationInput) {
  //   return await this.orderService.findAll(input);
  // }

  @Query(() => [OrderModel])
  async orders(@Args('input') input: GetOrdersInput) {
    return await this.orderService.findAll(input);
  }

  @Query(() => OrderModel)
  async order(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.findOne(id);
  }

  @Mutation(() => OrderModel)
  async updateOrder(@Args('input') input: UpdateOrderInput) {
    return await this.orderService.update(input);
  }

  @Mutation(() => OrderModel)
  async updateOrderItems(@Args('input') input: UpdateOrderItemsInput) {
    return await this.orderService.updateOrderItems(input);
  }

  @Mutation(() => OrderModel)
  async removeOrder(@Args('id', { type: () => String }) id: string) {
    return await this.orderService.remove(id);
  }
}
