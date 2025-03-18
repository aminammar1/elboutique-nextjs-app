import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { CategorySchema } from 'src/categories/schemas/category.schema';
import { SubCategorySchema } from 'src/subcategories/schemas/subcategories.schema';
import { ProductsService } from './products.service';
import { UploadService } from 'src/upload/upload.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'SubCategory',
        schema: SubCategorySchema,
      }
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService , UploadService],
})
export class ProductsModule {}
