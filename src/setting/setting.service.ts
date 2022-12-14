import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSettingInput } from './input/createSetting.input';
import { UpdateSettingInput } from './input/updateSetting.input';
import { Setting } from './schema/setting.schema';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<Setting>,
  ) {}

  async create(input: CreateSettingInput): Promise<Setting> {
    const createNew = new this.settingModel(input);
    try {
      return await createNew.save();
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async findAll(): Promise<Setting[]> {
    return await this.settingModel.find({ deletedAt: { $exists: false } });
  }

  async findOne(id: string): Promise<Setting> {
    const setting = await this.settingModel.findById(id).exec();
    if (!setting) throw new NotFoundException(`Setting ${id} Not Found`);
    return setting;
  }

  async update(input: UpdateSettingInput): Promise<Setting> {
    const setting = await this.settingModel
      .findByIdAndUpdate(input._id, input)
      .setOptions({ new: true });
    if (!setting) throw new NotFoundException(`Setting ${input._id} Not Found`);
    return setting;
  }

  async remove(id: string): Promise<Setting> {
    const setting = await this.settingModel
      .findByIdAndUpdate(id, { deletedAt: Date.now().toString() })
      .setOptions({ new: true });
    if (!setting) throw new NotFoundException(`setting ${id} Not Found`);
    return setting;
    /*    const setting = await this.settingModel.findByIdAndDelete(id);
    if (!setting) throw new NotFoundException(`Setting ${id} Not Found`);
    return setting; */
  }
}
