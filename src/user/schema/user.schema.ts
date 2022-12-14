import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/role/schema/role.schema';
import { Profile } from 'src/user/schema/profile.schema';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ nullable: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ nullable: true })
  password: string;

  @Prop({ type: Profile, ref: Profile.name, required: false })
  profile: Profile;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  role: Role;

  @Prop({ nullable: true })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
