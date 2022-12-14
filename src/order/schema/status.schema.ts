import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type StatusDocument = Status & mongoose.Document;
@Schema({ _id: false })
export class Status {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;
}
