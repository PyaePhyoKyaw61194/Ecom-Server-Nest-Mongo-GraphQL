import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SettingModel {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field({ nullable: true })
  deletedAt: Date;
}
