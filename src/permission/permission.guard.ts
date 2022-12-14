import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permission } from './schema/permission.schema';

export const PermissionGuard = (authPermission: string): Type<CanActivate> => {
  class RolesGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const gqlContext = GqlExecutionContext.create(context);

      const user = gqlContext.getContext().req.user;
      const userPermissions = await user.role.populate({
        path: 'permissions',
        select: '-_id name',
      });

      return userPermissions.permissions.some(
        (permission: Permission) => permission.name === authPermission,
      );
    }
  }

  return mixin(RolesGuardMixin);
};
