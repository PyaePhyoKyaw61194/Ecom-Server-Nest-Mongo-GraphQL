import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PermissionDocument = Permission & mongoose.Document;

@Schema()
export class Permission {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ nullable: true })
  description?: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
