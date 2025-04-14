    import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
    } from '@nestjs/common';
    import { CartService } from './cart.service';
    import { AuthGuard } from '../guards/auth.guards';

    @Controller('cart')
    @UseGuards(AuthGuard)
    export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('addToCart')
    async addCartItem(
        @Req() req,
        @Body() body: { productId: string; quantity: number },
    ) {
        const userId = req.userId;
        return this.cartService.createCartItem(
        userId,
        body.productId,
        body.quantity,
        );
    }

    @Get('getcart')
    async getCartItems(@Req() req) {
        const userId = req.userId;
        return this.cartService.getCartItemsByUser(userId);
    }

    @Put('updatecart/:id')
    async updateCartItem(
        @Param('id') id: string,
        @Body() body: { quantity: number },
    ) {
        return this.cartService.updateCartItem(id, body.quantity);
    }

    @Delete('deletecart/:id')
    async deleteCartItem(@Param('id') id: string) {
        return this.cartService.deleteCartItem(id);
    }
    }
