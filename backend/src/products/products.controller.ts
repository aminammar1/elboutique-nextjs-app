import { Controller , Get , Post , Put , Delete , Param , Body , UseGuards} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guards';
import { AuthGuard } from 'src/guards/auth.guards';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('create-product')
    @UseGuards(AuthGuard,AdminGuard)
    async createProduct(@Body() productData: any) {
        return this.productsService.createProduct(productData);
    }
}
