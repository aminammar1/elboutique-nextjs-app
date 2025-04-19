import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsString()
  @IsOptional()
  images: string;

  @IsObject()
  @IsOptional()
  style: {
    color: string;
  };

  @IsString()
  @IsOptional()
  option: string;
}

class ShippingAddressDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

class CouponAppliedDto {
  @IsString()
  @IsOptional()
  code: string;

  @IsNumber()
  @IsOptional()
  discount: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  shippingStatus: string;

  @IsString()
  @IsNotEmpty()
  shippingTimes: string;

  @IsNumber()
  @IsOptional()
  shippingPrice: number;

  @IsEnum(['credit_card', 'paypal', 'cash_on_delivery'])
  @IsNotEmpty()
  paymentMethod: string;

  @IsBoolean()
  @IsOptional()
  isPaid: boolean;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsOptional()
  totalBeforeDiscount: number;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CouponAppliedDto)
  couponApplied: CouponAppliedDto;
}
