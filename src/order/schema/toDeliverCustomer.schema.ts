import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Address } from './address.schema';

export type ToDeliverCustomerDocument = toDeliverCustomer & mongoose.Document;

@Schema({ _id: false })
export class toDeliverCustomer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  secondaryPhone: string;

  @Prop({ type: Address, ref: Address.name, required: true })
  address: Address;
}
