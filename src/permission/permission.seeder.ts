import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { seedData } from './seedData';
import { Permission } from './schema/permission.schema';

@Injectable()
export class PermissionSeeder implements Seeder {
  constructor(
    @InjectModel(Permission.name) private permission: Model<Permission>,
  ) {}

  async seed(): Promise<any> {
    return this.permission.insertMany(seedData);
  }

  async drop(): Promise<any> {
    return this.permission.deleteMany({});
  }
}
