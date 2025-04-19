import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  @IsEnum(['pending', 'processing', 'completed', 'cancelled'])
  status?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['pending', 'shipped', 'delivered', 'complete'])
  shippingStatus?: string;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;
}
