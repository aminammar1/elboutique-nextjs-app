import { Controller, Post, Get, Put , Body, UseGuards , Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/category.dto';
import { AdminGuard } from 'src/guards/admin.guards';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post('create-category')
    @UseGuards(AuthGuard,AdminGuard)
    async createCategory( @Body() CategoryData: CreateCategoryDto) {
        return this.categoriesService.createCategory(CategoryData);
    }

    @Get('get-categories')
    async getCategories() {
        return this.categoriesService.getCategories();
    }

    @Put('update-category/:categoryId')
    @UseGuards(AuthGuard,AdminGuard)
    async updateCategory(@Param('categoryId') categoryId: string, @Body() categoryData: any) {
        return this.categoriesService.updateCategory(categoryId, categoryData);
    }

    @Delete('delete-category/:categoryId')
    @UseGuards(AuthGuard,AdminGuard)
    async deleteCategory(@Param('categoryId') categoryId: string) {
        return this.categoriesService.deleteCategory(categoryId);
    }

    @Get('get-category/:categoryId')
    async getCategory(@Param('categoryId') categoryId: string) {
        return this.categoriesService.getCategoryById(categoryId);
    }
}
