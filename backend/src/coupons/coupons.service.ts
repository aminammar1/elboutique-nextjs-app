    import { Injectable } from '@nestjs/common'
    import { InjectModel } from '@nestjs/mongoose'
    import { Model } from 'mongoose'
    import { Coupon } from './schemas/coupons.schema'
    import { VerifyCouponDto } from './dto/coupons.dto'
    import { generateCouponCode } from './utils/generate-coupon'
    import { NotFoundException } from '@nestjs/common'

    @Injectable()
    export class CouponsService {
    constructor(
        @InjectModel('Coupon') private couponModel: Model<Coupon>
    ) {}

    async verifyCoupon(code: string): Promise<Coupon> {
        const coupon = await this.couponModel.findOne({ code })
        if (!coupon) {
            throw new NotFoundException('Coupon not found or invalid')
        }
        return coupon
    }

    async findAll() {
        return this.couponModel.find()
    }

    async generateUniqueCoupon(): Promise<Coupon> {
        let code: string
        let exists = true
    
        do {
            code = generateCouponCode()
            const existing = await this.couponModel.findOne({ code })
            exists = !!existing
            } while (exists)
    
            const newCoupon = new this.couponModel({ code })
            return newCoupon.save()
        }
    }
