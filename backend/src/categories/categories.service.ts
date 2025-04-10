import { Injectable , NotFoundException , HttpException, HttpStatus} from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { SubCategory } from 'src/subcategories/schemas/subcategories.schema';
import { Product } from 'src/products/schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name )
        private readonly categoryModel: Model<Category>,
        @InjectModel(SubCategory.name)
        private readonly subcategoryModel: Model<SubCategory>,
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
    ) {}

    /** Create Category  */
    async createCategory(CategoryData: CreateCategoryDto) {
        const { name } = CategoryData;
        try {
            const category = new this.categoryModel({ name });
            await category.save();

            return {
                message: 'Category created successfully',
                success: true,
                error: false,
                data: category,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }

    /** Get All Categories */
    async getCategories() {
        try {
            const categories = await this.categoryModel.find().exec();
            return {
                message: 'Categories fetched successfully',
                success: true,
                error: false,
                data: categories,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }


    /** Update categories  */

    async updateCategory(categoryId: string, categoryData: any) {
        try {
            const updateCategory = await this.categoryModel.findByIdAndUpdate(
                categoryId, categoryData, { new: true },
            );
            if (!updateCategory) {
                throw new NotFoundException ('Category not found');
            }
            return {
                message: 'Category updated successfully',
                success: true,
                error: false,
                data: updateCategory,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }

    /** Delete categories  */

    async deleteCategory(categoryId: string) {
        try {
            const subcategory = await this.subcategoryModel.find({ category: categoryId });
            const product = await this.productModel.find({ category: categoryId });
            if (subcategory.length > 0  || product.length > 0) {
                throw new HttpException(
                    {
                        message: 'Category has subcategories or products. Please delete them first',
                        success: false,
                        error: true,
                    },
                    HttpStatus.BAD_REQUEST, // 400 status
                );
            }
    
            const deleteCategory = await this.categoryModel.findByIdAndDelete(categoryId);
            if (!deleteCategory) {
                throw new NotFoundException('Category not found');
            }
    
            return {
                message: 'Category deleted successfully',
                success: true,
                error: false,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    message: error.message || 'Internal Server Error',
                    success: false,
                    error: true,
                },
                HttpStatus.INTERNAL_SERVER_ERROR, // 500 status
            );
        }
    }


    /** Get Category by ID */
    async getCategoryById(categoryId: string) {
        try {
            const category = await this.categoryModel.findById(categoryId).exec();
            if (!category) {
                throw new NotFoundException('Category not found');
            }
            return {
                message: 'Category fetched successfully',
                success: true,
                error: false,
                data: category,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }
}    
