import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Permissions } from 'src/enum/permission.enum';
import { PermissionGuard } from 'src/permission/permission.guard';
import { CreateUserInput } from './input/createUser.input';
import { DeleteUserInput } from './input/deleteUser.input';
import { GetUsersInput } from './input/getUsers.input';
import { updateUserInput } from './input/updateUser.input';
import { CreateUserModel } from './model/createUser.model';
import { SoftDeleteUserModel } from './model/softDeleteUser.model';
import { UserModel } from './model/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  @UseGuards(PermissionGuard(Permissions.GetUser))
  async users(@Args('input') input: GetUsersInput) {
    return await this.userService.findAll(input);
  }

  @Query(() => [UserModel])
  @UseGuards(PermissionGuard(Permissions.GetUser))
  async usersByName() {
    return await this.userService.findByName();
  }

  @Query(() => UserModel)
  @UseGuards(PermissionGuard(Permissions.GetUser))
  async user(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => CreateUserModel)
  async createUser(@Args('input') input: CreateUserInput) {
    return await this.userService.create(input);
  }

  @Mutation(() => UserModel)
  // @UseGuards(PermissionGuard(Permissions.UpdateUser))
  async updateUser(@Args('input') input: updateUserInput) {
    return await this.userService.update(input);
  }

  @Mutation(() => UserModel)
  async deleteUser(@Args('input') input: DeleteUserInput) {
    return await this.userService.delete(input);
  }

  @Mutation(() => SoftDeleteUserModel)
  async softDeleteUser(@Args('input') input: DeleteUserInput) {
    return await this.userService.softDelete(input);
  }
}
