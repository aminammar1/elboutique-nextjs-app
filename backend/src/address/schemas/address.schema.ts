    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
    import { Document } from 'mongoose';
    import { Types } from 'mongoose';

    @Schema({ timestamps: true })
    export class Address extends Document {
    @Prop({ default: '' })
    firstName: string;

    @Prop({ default: '' })
    lastName: string;

    @Prop({ default: '' })
    phoneNumber: string;

    @Prop({ default: '' })
    state: string;

    @Prop({ default: '' })
    city: string;

    @Prop({ default: '' })
    zipCode: string;

    @Prop({ default: '' })
    address: string;

    @Prop({ default: '' })
    country: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
    }

    export const AddressSchema = SchemaFactory.createForClass(Address);
