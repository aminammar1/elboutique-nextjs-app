import { Controller, Post, Body, Get } from '@nestjs/common'
import { CouponsService } from './coupons.service'
import { VerifyCouponDto } from './dto/coupons.dto'

    @Controller('coupons')
    export class CouponsController {
    constructor(private readonly couponsService: CouponsService) {}

    @Post('verify-coupon')
    async verify(@Body() body: VerifyCouponDto) {
    return this.couponsService.verifyCoupon(body.code)
    }

    @Get('show-coupons')
    async findAll() {
        return this.couponsService.findAll()
    }
    @Get('generate')
        async generateCoupon() {
        return this.couponsService.generateUniqueCoupon()
        }
}
