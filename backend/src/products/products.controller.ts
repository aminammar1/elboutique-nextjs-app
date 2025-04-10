import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards , Request , Query } from '@nestjs/common';
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

    @Get('product/:id')
    async getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @Get('category/:categoryName')
    async getProductsByCategoryName(@Param('categoryName') categoryName: string) {
        return this.productsService.getProductsByCategoryName(categoryName);
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

    @Post('add-review/:productId')
    @UseGuards(AuthGuard)
    async addReview(
        @Param('productId') productId: string,
        @Body() reviewData: any,
        @Request() req: any
    ) {
        return this.productsService.addReview(productId, req.userId, reviewData);
    }

    @Get('get-product-bycategoryId/:categoryId')
    async getProductByCategoryId(@Param('categoryId') categoryId: string) {
        return this.productsService.getProductsByCategoryId(categoryId);
    }

    @Get('get-product-bysubcategoryId/:subcategoryId')
    async getProductBySubCategoryId(@Param('subcategoryId') subcategoryId: string) {
        return this.productsService.getProductsBySubCategoryId(subcategoryId);
    }

        @Get('get-products-by-price-range')
            async getProductsByPriceRange(
            @Query('min') min: string = '0',
            @Query('max') max: string = '10000',
            ) {
                return this.productsService.getProductsByPriceRange(
                    parseFloat(min),
                    parseFloat(max),
                )
            }
}
