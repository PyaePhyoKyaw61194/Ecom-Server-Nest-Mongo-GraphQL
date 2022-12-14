import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleService } from 'src/role/role.service';
import { createHash } from 'src/utils/hash';
import { CreateUserInput } from './input/createUser.input';
import { DeleteUserInput } from './input/deleteUser.input';
import { FindUserByEmailInput } from './input/findUserByEmail.input';
import { GetUsersInput } from './input/getUsers.input';
import { updateUserInput } from './input/updateUser.input';
import { UserModel } from './model/user.model';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private roleService: RoleService,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    if (createUserInput.password) {
      const hashedPwd = await createHash(createUserInput.password);
      createUserInput.password = hashedPwd;
    }

    const role = await this.roleService.findByName('User');
    createUserInput.role = role.id;

    const createNew = new this.userModel(createUserInput);

    try {
      return await createNew.save();
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // TODO: filter
  async findAll(input: GetUsersInput): Promise<any> {
    let perPage = 10;
    if (input.page == 0) {
      perPage = 0;
    }
    return await this.userModel
      .where('deletedAt', null)
      .find({
        $or: [
          { email: { $regex: input.search || '', $options: 'i' } },
          { code: { $regex: input.search || '', $options: 'i' } },
          { 'profile.name': { $regex: input.search || '', $options: 'i' } },
          { 'profile.phone': input.search || '' },
          {
            'profile.facebook.userName': {
              $regex: input.search || '',
              $options: 'i',
            },
          },
          { 'profile.facebook.userId': input.search || '' },
        ],
      })
      .sort({ createdAt: 'desc' })
      .limit(perPage)
      .skip((input.page - 1) * perPage)
      .exec();
  }

  async findByName(): Promise<any> {
    return await this.userModel.find().limit(3).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new NotFoundException(`User ${id} Not Found`);

    return user;
  }

  async findByEmail(findUserByEmailInput: FindUserByEmailInput): Promise<User> {
    const user = await this.userModel
      .where('deletedAt', null)
      .findOne({ email: findUserByEmailInput.email })
      .populate('profile')
      .populate('role')
      .exec();

    if (!user || user.role.name.includes('User'))
      throw new NotFoundException('Invalid Credentials');

    return user;
  }

  async update(updateUserInput: updateUserInput) {
    delete updateUserInput.code;
    const user = await this.userModel.findOneAndUpdate(
      { _id: updateUserInput._id },
      { $set: updateUserInput },
      { new: true },
    );
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async delete(deleteUserInput: DeleteUserInput) {
    const user = await this.userModel
      .findByIdAndDelete(deleteUserInput._id, { new: true })
      .exec();

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async softDelete(deleteUserInput: DeleteUserInput) {
    const user = await this.userModel
      .findByIdAndUpdate(
        deleteUserInput._id,
        {
          deletedAt: new Date(),
        },
        { new: true },
      )
      .exec();

    if (!user) throw new NotFoundException('User not found');

    return { message: `User is deleted` };
  }
}
