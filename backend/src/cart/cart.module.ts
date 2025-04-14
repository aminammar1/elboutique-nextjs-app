import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartProduct, CartProductSchema } from './schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CartProduct.name, schema: CartProductSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
