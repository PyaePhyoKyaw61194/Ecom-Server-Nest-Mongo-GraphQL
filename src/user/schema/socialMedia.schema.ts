import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class SocialMediaData {
  @Prop({ required: false })
  userName: string;

  @Prop({ required: false })
  userId: string;

  @Prop({ required: false })
  profileUrl: string;
}
