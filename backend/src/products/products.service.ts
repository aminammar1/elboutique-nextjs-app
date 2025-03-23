import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
    ) {}

    /** Create Product */
    async createProduct(ProductData: any) {
        try {
            const product = new this.productModel(ProductData);
            await product.save();
            return { message: 'Product created successfully', success: true, data: product };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }

    /** Get All Products */
    async getAllProducts() {
        return await this.productModel.find();
    }

    /** Update Product */
    async updateProduct(id: string, updateData: any) {
        const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!product) throw new NotFoundException('Product not found');
        return { message: 'Product updated successfully', success: true, data: product };
    }

    /** Delete Product */
    async deleteProduct(id: string) {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) throw new NotFoundException('Product not found');
        return { message: 'Product deleted successfully', success: true };
    }

      /** Get Best Price With Discount */
        async getBestPriceWithDiscountFromProduct(productId: string) {
        const product = await this.productModel.findById(productId);
        if (!product) throw new NotFoundException('Product not found');
        
        if (!product.price || !product.discount) return product.price;
        
        return product.price - (product.price * (product.discount / 100));
    }

    /** Get Best Price Without Discount */
    async getBestPriceWithoutDiscountFromProduct(productId: string) {
        const product = await this.productModel.findById(productId);
        if (!product) throw new NotFoundException('Product not found');
        
        return product.price;
    }

    /** Get Discount Rate */
    async getDiscountRate(productId: string) {
        const product = await this.productModel.findById(productId);
        if (!product) throw new NotFoundException('Product not found');
        
        return product.discount || 0;
    }
}
