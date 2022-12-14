import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tag } from 'src/tag/schema/tag.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop([String])
  images: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  tags: Tag[];

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  isAvailable: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
