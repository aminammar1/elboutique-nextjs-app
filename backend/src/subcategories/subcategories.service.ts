import { Injectable , NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SubCategory } from './schemas/subcategories.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubcategoriesService {
    constructor(
        @InjectModel(SubCategory.name)
        private readonly subcategoryModel: Model<SubCategory>,
    ) {}

    /** Create SubCategory  */
    async createSubCategory(subCategoryData: any) {
        const { name, category } = subCategoryData;
        try {
            const subcategory = new this.subcategoryModel({ name, category });
            await subcategory.save();

            return {
                message: 'SubCategory created successfully',
                success: true,
                error: false,
                data: subcategory,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }

    /** Get All SubCategories */
    async getAllSubCategories() {
        try {
            const subcategories = await this.subcategoryModel.find().populate({
                path: 'category',
                model: 'Category' 
            }).exec();
            
            return {
                message: 'SubCategories fetched successfully',
                success: true,
                error: false,
                data: subcategories,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }

    /** Update SubCategories */

    async updateSubCategory(subCategoryId: string, subCategoryData: any) {
        try {
            const subcategory = await this.subcategoryModel
                .findByIdAndUpdate(subCategoryId, subCategoryData, { new: true })
                .exec();
            if (!subcategory) {
                throw new NotFoundException('SubCategory not found');
            }
            return {
                message: 'SubCategory updated successfully',
                success: true,
                error: false,
                data: subcategory,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }


    /** Delete SubCategories */
    async deleteSubCategory(subCategoryId: string) {
        try {
            const subcategory = await this.subcategoryModel.findByIdAndDelete(subCategoryId).exec();
            if (!subcategory) {
                throw new NotFoundException('SubCategory not found');
            }
            return {
                message: 'SubCategory deleted successfully',
                success: true,
                error: false,
                data: subcategory,
            };
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error');
        }
    }

    /** Get SubCategory by ID */
    async getSubCategoryById(subCategoryId: string) {
        try {
          const subcategory = await this.subcategoryModel.findById(subCategoryId).populate('category') // optional populate
            if (!subcategory) {
            throw new NotFoundException('Subcategory not found')
            }
    
            return {
            message: 'Subcategory fetched successfully',
            success: true,
            error: false,
            data: subcategory,
            }
        } catch (error) {
            throw new Error(error.message || 'Internal Server Error')
        }
        }
    }
