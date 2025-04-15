    import { Injectable, NotFoundException } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { CartProduct } from './schemas/cart.schema';
    import { User } from 'src/user/schemas/user.schema';

    @Injectable()
    export class CartService {
    constructor(
        @InjectModel(CartProduct.name)
        private readonly cartModel: Model<CartProduct>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async createCartItem(userId: string, productId: string, quantity: number) {
        const cartItem = new this.cartModel({ userId, productId, quantity });
        const savedCartItem = await cartItem.save();
        
        await this.userModel.findByIdAndUpdate(userId, {
            $push: { shopping_cart: savedCartItem._id },
        });
        return savedCartItem;
    }

    async getCartItemsByUser(userId: string) {
        return await this.cartModel.find({ userId }).populate('productId');
    }

    async updateCartItem(cartItemId: string, quantity: number) {
        const cartItem = await this.cartModel.findByIdAndUpdate(
        cartItemId,
        { quantity },
        { new: true },
        );
        if (!cartItem) {
        throw new NotFoundException('Cart item not found');
        }
        return cartItem;
    }

    async deleteCartItem(cartItemId: string) {
        const cartItem = await this.cartModel.findByIdAndDelete(cartItemId);
        if (!cartItem) {
        throw new NotFoundException('Cart item not found');
        }
        return { message: 'Cart item deleted successfully' };
    }
    }
