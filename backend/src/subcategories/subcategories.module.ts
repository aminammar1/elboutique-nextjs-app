import { Module } from '@nestjs/common';
import { SubcategoriesController } from './subcategories.controller';
import { User , UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from './schemas/subcategories.schema';
import { CategorySchema } from 'src/categories/schemas/category.schema';
import { SubcategoriesService } from './subcategories.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubCategory.name,
        schema: SubCategorySchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      }
    ]),
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})

export class SubcategoriesModule {}
