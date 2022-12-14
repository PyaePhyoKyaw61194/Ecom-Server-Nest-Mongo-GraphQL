import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { RoleModel } from './model/role.model';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => [RoleModel])
  async roles() {
    return await this.roleService.findAll();
  }
}
