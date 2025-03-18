import {
    Injectable,
    NotFoundException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    ) {}

  /** Create Prouduct */
    async createProduct(ProductData: any) {
    const {
        productName,
        image,
        category,
        subCategory,
        stockCount,
        price,
        discount,
        productDescription,
        additionalInfo,
        stylesColors,
    } = ProductData;

    try {
        const product = new this.productModel({
        productName,
        image,
        category,
        subCategory,
        stockCount,
        price,
        discount,
        productDescription,
        additionalInfo,
        stylesColors,
        });
        await product.save();

        return {
        message: 'Product created successfully',
        success: true,
        error: false,
        data: product,
        };
    } catch (error) {
        throw new Error(error.message || 'Internal Server Error');
    }
    }
}
