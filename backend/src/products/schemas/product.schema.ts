import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: String })
  productName: string;

  @Prop({ type: [String], default: [] })
  image: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  category: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SubCategory' }] })
  subCategory: Types.ObjectId[];

  @Prop({ type: Number, default: null })
  stockCount: number;

  @Prop({ type: Number, default: null })
  price: number;

  @Prop({ type: Number, default: null })
  discount: number;

  @Prop({ type: String, default: '' })
  productDescription: string;

  @Prop({ type: Object, default: {} })
  additionalInfo: Record<string, any>;

  @Prop({ type: String, default: '' })
  stylesColors: string;

  @Prop({ type: Number, default: null })
  rating: number;

  @Prop({
    type: [
      {
        reviewBy: {
          id: String,
          fullName: String,
          imageUrl: String,
        },
        review: String,
        rating: Number,
        images: [String],
        likes: [String], // user ids who liked
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  reviews: Record<string, any>[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
