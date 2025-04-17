import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CouponsService } from './coupons.service'
import { CouponsController } from './coupons.controller'
import { CouponSchema } from './schemas/coupons.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }])
  ],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
