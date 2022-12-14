import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Permission } from 'src/permission/schema/permission.schema';

export type RoleDocument = Role & mongoose.Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ nullable: true })
  description?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Permission.name }],
    required: true,
  })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
