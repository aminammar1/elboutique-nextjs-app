import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Enable timestamps
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: '' })
  mobile: string;

  @Prop({ default: null })
  last_login_date: Date;

  @Prop({
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  })
  status: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Address' }] })
  address_details: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CartProduct' }] })
  shopping_cart: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  orderHistory: Types.ObjectId[];

  @Prop({
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
