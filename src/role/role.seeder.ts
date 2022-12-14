import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Role } from './schema/role.schema';
import { Permission } from 'src/permission/schema/permission.schema';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectModel(Permission.name) private permission: Model<Permission>,
    @InjectModel(Role.name) private role: Model<Role>,
  ) {}

  async seed(): Promise<any> {
    const permissionRefs = await this.permission
      .find({})
      .select({
        id: true,
      })
      .exec();

    return this.role.insertMany([
      {
        name: 'SuperAdmin',
        description: '',
        permissions: permissionRefs,
      },
      {
        name: 'Admin',
        description: '',
        permissions: permissionRefs,
      },
      {
        name: 'User',
        description: 'Normal User / Customer',
        permissions: [],
      },
    ]);
  }

  async drop(): Promise<any> {
    return this.role.deleteMany({});
  }
}
