import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Region } from './region.schema';

export type AddressDocument = Address & mongoose.Document;

@Schema({ _id: false })
export class Address {
  @Prop({ type: Region, ref: Region.name, required: true })
  region: Region;

  @Prop({ required: true })
  township: string;

  @Prop({ required: true })
  fullAddress: string;
}
