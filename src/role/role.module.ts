import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { Role, RoleSchema } from './schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
