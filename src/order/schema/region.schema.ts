import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RegionDocument = Region & mongoose.Document;

@Schema({ _id: false })
export class Region {
  @Prop({ required: true })
  regionId: string;

  @Prop({ required: true })
  code: string;
}
