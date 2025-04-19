import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  qty: number;

  @Prop()
  images: string;

  @Prop({ type: Object })
  style: {
    color: string;
  };

  @Prop()
  option: string;
}

@Schema({ timestamps: true })
export class ShippingAddress {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  phoneNumber: string;
}

@Schema({ timestamps: true })
export class CouponApplied {
  @Prop()
  code: string;

  @Prop()
  discount: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: [{ type: Object }], required: true })
  products: Product[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Object, required: true })
  shippingAddress: ShippingAddress;

  @Prop({
    default: 'pending',
    enum: ['pending', 'processing', 'completed', 'cancelled'],
  })
  status: string;

  @Prop({
    default: 'pending',
    enum: ['pending', 'shipped', 'delivered', 'complete'],
  })
  shippingStatus: string;

  @Prop()
  shippingTimes: string;

  @Prop({ default: 0 })
  shippingPrice: number;

  @Prop({ enum: ['credit_card', 'paypal', 'cash_on_delivery'], required: true })
  paymentMethod: string;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  paidAt: Date;

  @Prop()
  stripePaymentIntentId: string;

  @Prop()
  stripeSessionId: string;

  @Prop({ required: true })
  total: number;

  @Prop()
  totalBeforeDiscount: number;

  @Prop({ type: Object })
  couponApplied: CouponApplied;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
