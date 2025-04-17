import { Schema, Document } from 'mongoose'

    export interface Coupon extends Document {
    code: string
    createdAt: Date
    }

    export const CouponSchema = new Schema<Coupon>({
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    })
