import { CreateSettingInput } from './createSetting.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSettingInput extends PartialType(CreateSettingInput) {
  @Field()
  _id: string;
}
