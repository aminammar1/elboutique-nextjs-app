import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SubCategory extends Document {
    @Prop({ default: '' })
    name: string;
    
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
    category: Types.ObjectId[];
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);