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

    /** Get Product By ID */
    async getProductById(id: string) { 
        try {
            const product = await this.productModel.findById(id);
            if (!product) throw new NotFoundException('Product not found');
            return { message: 'Product retrieved successfully', success: true, data: product };
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    /** Get Products By Category */

    /** Get Products By Category */
    async getProductsByCategory(categoryName: string) {
        try {
            const products = await this.productModel.find({ category: categoryName });
            return { message: 'Products retrieved successfully', success: true, data: products };
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
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


    /** Add Review on Product  */
    async addReview(productId: string, reviewData: any) {
        const product = await this.productModel.findById(productId);
        if (!product) {
        throw new NotFoundException('Product not found');
        }
        product.reviews.push(reviewData);
        const totalRatings = product.reviews.reduce((acc, r) => acc + Number(r.rating), 0);
        const avgRating = totalRatings / product.reviews.length;
        product.rating = Number(avgRating.toFixed(1));
        await product.save();
        return {
            message: 'Review added successfully!',
            updatedRating: product.rating,
        };
        }
}
