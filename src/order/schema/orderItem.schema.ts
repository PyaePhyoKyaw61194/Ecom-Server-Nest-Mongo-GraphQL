import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, _id: false })
export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  boughtPrice: number;

  @Prop({ required: true })
  boughtQuantity: number;
}
