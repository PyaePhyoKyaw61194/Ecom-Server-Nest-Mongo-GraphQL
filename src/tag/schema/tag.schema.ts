import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TagDocument = Tag & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Tag {
  // @Prop()
  // _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  color: string;

  @Prop()
  type: string;

  @Prop()
  deletedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
