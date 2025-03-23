import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guards';
import { AuthGuard } from 'src/guards/auth.guards';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('create-product')
    @UseGuards(AuthGuard, AdminGuard)
    async createProduct(@Body() productData: any) {
        return this.productsService.createProduct(productData);
    }

    @Get('all')
    async getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Put('update/:id')
    @UseGuards(AuthGuard, AdminGuard)
    async updateProduct(@Param('id') id: string, @Body() updateData: any) {
        return this.productsService.updateProduct(id, updateData);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard, AdminGuard)
    async deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }

    @Get('best-price-with-discount/:productId')
    async getBestPriceWithDiscountFromProduct(@Param('productId') productId: string) {
        return this.productsService.getBestPriceWithDiscountFromProduct(productId);
    }

    @Get('best-price-without-discount/:productId')
    async getBestPriceWithoutDiscountFromProduct(@Param('productId') productId: string) {
        return this.productsService.getBestPriceWithoutDiscountFromProduct(productId);
    }

    @Get('getDiscountRate/:productId')
    async getDiscountRate(@Param('productId') productId: string) {
        return this.productsService.getDiscountRate(productId);
    }
}
