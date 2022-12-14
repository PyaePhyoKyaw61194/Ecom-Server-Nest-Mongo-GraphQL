import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SocialMediaData } from './socialMedia.schema';

export type ProfileDocument = Profile & mongoose.Document;

@Schema({ _id: false })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ nullable: true })
  address: string;

  @Prop({ type: SocialMediaData, required: false })
  facebook: SocialMediaData;
}
