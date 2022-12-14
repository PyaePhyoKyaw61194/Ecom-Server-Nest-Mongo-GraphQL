import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schema/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async findByName(name: string) {
    const role = await this.roleModel.findOne({ name }).exec();
    if (!role) throw new NotFoundException('Role not found.');
    return role;
  }

  async findById(id: string) {
    const role = await this.roleModel
      .findById(id)
      .populate('permissions')
      .exec();
    if (!role) throw new NotFoundException('Role not found.');
    return role;
  }

  async findAll() {
    return await this.roleModel.find().exec();
  }
}
