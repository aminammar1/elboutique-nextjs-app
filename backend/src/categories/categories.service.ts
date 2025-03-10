import { Injectable , NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
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
            const category = await this.categoryModel.findByIdAndDelete(categoryId);
            if (!category) {
                throw new NotFoundException('Category not found');
            }
            return {
                message: 'Category deleted successfully',
                success: true,
                error: false,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }
}
