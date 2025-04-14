import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Model , Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    /** Create Product */
        async createProduct(productData: any) {
            try {
            const productToCreate = {
                ...productData,
                price: Number(productData.price),
                discount: productData.discount ? Number(productData.discount) : 0,
                stockCount: productData.stockCount ? Number(productData.stockCount) : 0,
                
                // Convert category data to proper format if it's not already
                category: Array.isArray(productData.category) 
                ? productData.category.map(cat => ({
                    _id: new this.productModel.base.Types.ObjectId(cat._id),
                    name: cat.name
                    }))
                : [{
                    _id: new this.productModel.base.Types.ObjectId(productData.category._id),
                    name: productData.category.name
                    }],
                
                // Convert subcategory data similarly
                subCategory: Array.isArray(productData.subCategory)
                ? productData.subCategory.map(sub => ({
                    _id: new this.productModel.base.Types.ObjectId(sub._id),
                    name: sub.name
                    }))
                : [{
                    _id: new this.productModel.base.Types.ObjectId(productData.subCategory._id),
                    name: productData.subCategory.name
                    }]
            };
        
            const product = new this.productModel(productToCreate);
            await product.save();
            
            return { 
                message: 'Product created successfully', 
                success: true, 
                data: product 
            };
            } catch (error) {
            console.error('Error creating product:', error);
            throw new Error(error.message || 'Failed to create product');
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

    /** Get Products By CategoryID */

        async getProductsByCategoryId(categoryId: string) {
            try {
            const objectId = new Types.ObjectId(categoryId)
            const products = await this.productModel.find({
                'category._id': objectId
            })
            return {
                message: 'Products retrieved successfully',
                success: true,
                data: products
            }
            } catch (error) {
            throw new HttpException('Invalid Category ID or Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        /** Get Products By SubCategoryID */
            async getProductsBySubCategoryId(subCategoryId: string) {
                try {
                const objectId = new Types.ObjectId(subCategoryId)
                const products = await this.productModel.find({
                    'subCategory._id': objectId
                })
                return {
                    message: 'Products retrieved successfully',
                    success: true,
                    data: products
                }
                } catch (error) {
                throw new HttpException('Invalid SubCategory ID or Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            }

    /** Get Products By Category Name */
        async getProductsByCategoryName(categoryName: string) {
            try {
            const products = await this.productModel.find({
                'category.name': categoryName
            });
            return {
                message: 'Products retrieved successfully',
                success: true,
                data: products
            };
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


        /** Get Product By Price Range  */

        async getProductsByPriceRange(minPrice: number, maxPrice: number , ) {
            try {
                const products = await this.productModel.find({
                    price: { $gte: minPrice, $lte: maxPrice }
                });
                return {
                    message: 'Products retrieved successfully',
                    success: true,
                    data: products
                };
            }
            catch (error) {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


     /** Add Review on Product  */
        async addReview(productId: string, userId: string, reviewData: any) {
        const product = await this.productModel.findById(productId);
        if (!product) throw new NotFoundException('Product not found');
        const user = await this.userModel.findById(userId).select('name avatar');
        if (!user) throw new NotFoundException('User not found');
        
        const review = {
            ...reviewData,
            reviewBy: {
                id: user._id,
                fullName: user.name,
                imageUrl: user.avatar,
            },
            createdAt: new Date(),
        };
        
        product.reviews.push(review);
        
        const totalRatings = product.reviews.reduce((acc, r) => acc + Number(r.rating), 0);
        const avgRating = totalRatings / product.reviews.length;
        product.rating = Number(avgRating.toFixed(1));
        
        await product.save();
        
        return {
            message: 'Review added successfully!',
            updatedRating: product.rating,
            review: review 
        };
    }

        async getFilteredProducts(filter: string, perPage: number, page: number) {
            try {
            let sort: any = {}
        
            switch (filter) {
                case 'alphabetic':
                sort = { name: 1 }
                break
                case 'priceLowToHigh':
                sort = { price: 1 }
                break
                case 'priceHighToLow':
                sort = { price: -1 }
                break
                case 'latest':
                sort = { createdAt: -1 }
                break
                default:
                sort = {}
            }
        
            const skip = (page - 1) * perPage
            const products = await this.productModel
                .find()
                .sort(sort)
                .skip(skip)
                .limit(perPage)
        
            const total = await this.productModel.countDocuments()
        
            return {
                message: 'Filtered products retrieved successfully',
                success: true,
                data: products,
                total,
            }
            } catch (error) {
            throw new HttpException('Failed to fetch filtered products', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }


        /** Search Product */

            async searchProducts(query: string) {
                try {
                const products = await this.productModel.find({
                    $or: [
                    { productName: { $regex: query, $options: 'i' } },
                    { productDescription: { $regex: query, $options: 'i' } },
                    ],
                });
            
                return {
                    message: 'Products retrieved successfully',
                    success: true,
                    data: products,
                };
                } catch (error) {
                console.error(error);
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
}