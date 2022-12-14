import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type SettingDocument = Setting & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Setting {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  deletedAt: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
