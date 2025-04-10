import { Controller, Post, Get, Put , Body, UseGuards , Param, Delete } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guards';
import { AuthGuard } from 'src/guards/auth.guards';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
    constructor(private readonly subcategoriesService: SubcategoriesService) {}

    @Post('create-subcategory')
    @UseGuards(AuthGuard,AdminGuard)
    async createSubCategory( @Body() subCategoryData: any) {
        return this.subcategoriesService.createSubCategory(subCategoryData);
    }

    @Get('get-all-subcategories')
    async getAllSubCategories() {
        return this.subcategoriesService.getAllSubCategories();
    }

    @Put('update-subcategory/:subCategoryId')
    @UseGuards(AuthGuard,AdminGuard)
    async updateSubCategory(@Param('subCategoryId') subCategoryId: string, @Body() subCategoryData: any) {
        return this.subcategoriesService.updateSubCategory(subCategoryId, subCategoryData);
    }

    @Delete('delete-subcategory/:subCategoryId')
    @UseGuards(AuthGuard,AdminGuard)
    async deleteSubCategory(@Param('subCategoryId') subCategoryId: string) {
        return this.subcategoriesService.deleteSubCategory(subCategoryId);
    }

    @Get('get-subcategory/:subCategoryId')
    async getSubCategory(@Param('subCategoryId') subCategoryId: string) {
        return this.subcategoriesService.getSubCategoryById(subCategoryId);
    }
}
