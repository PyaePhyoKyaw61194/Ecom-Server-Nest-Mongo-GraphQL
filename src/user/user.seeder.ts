import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Seeder } from 'nestjs-seeder';
import { Role } from 'src/role/schema/role.schema';
import { createHash } from 'src/utils/hash';
import { User } from './schema/user.schema';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectModel(User.name) private user: Model<User>,
    @InjectModel(Role.name) private role: Model<Role>,
  ) {}

  async seed(): Promise<any> {
    const superAdminRoleId = await this.role
      .findOne({ name: 'SuperAdmin' })
      .select({ id: true })
      .exec();
    const adminRoleId = await this.role
      .findOne({ name: 'Admin' })
      .select({ id: true })
      .exec();

    return this.user.insertMany([
      {
        email: 'super.admin@gmail.com',
        code: 'UR' + nanoid(5),
        password: await createHash('superAdmin'),
        role: superAdminRoleId,
        profile: {
          name: 'super admin',
          phone: '09',
          facebook: null,
        },
      },
      {
        email: 'admin@gmail.com',
        code: 'UR' + nanoid(5),
        password: await createHash('admin'),
        role: adminRoleId,
        profile: {
          name: 'admin',
          phone: '09',
          facebook: null,
        },
      },
    ]);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
