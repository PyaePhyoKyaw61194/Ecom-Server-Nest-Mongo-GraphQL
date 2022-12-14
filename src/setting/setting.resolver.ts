import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SettingService } from './setting.service';
import { CreateSettingInput } from './input/createSetting.input';
import { UpdateSettingInput } from './input/updateSetting.input';
import { CreateSettingModel } from './model/createSetting.model';
import { SettingModel } from './model/setting.model';

@Resolver()
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  @Mutation(() => CreateSettingModel)
  async createSetting(@Args('input') input: CreateSettingInput) {
    return await this.settingService.create(input);
  }

  @Query(() => [SettingModel])
  async settings() {
    return await this.settingService.findAll();
  }

  @Query(() => SettingModel)
  async findSetting(@Args('id') id: string) {
    return await this.settingService.findOne(id);
  }

  @Mutation(() => CreateSettingModel)
  async updateSetting(@Args('input') input: UpdateSettingInput) {
    return await this.settingService.update(input);
  }

  @Mutation(() => CreateSettingModel)
  async removeSetting(@Args('id') id: string) {
    return await this.settingService.remove(id);
  }
}
