import { ObjectType } from '@nestjs/graphql';
import { SettingModel } from './setting.model';

@ObjectType()
export class CreateSettingModel extends SettingModel {}
