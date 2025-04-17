
    import { IsString, MinLength, MaxLength } from 'class-validator'

    export class CreateAddressDto {
    @IsString() @MinLength(3) @MaxLength(20)
    firstName: string

    @IsString() @MinLength(3) @MaxLength(20)
    lastName: string

    @IsString() @MinLength(3) @MaxLength(20)
    phoneNumber: string

    @IsString() @MinLength(3) @MaxLength(100)
    state: string

    @IsString() @MinLength(3) @MaxLength(100)
    city: string

    @IsString() @MinLength(3) @MaxLength(100)
    zipCode: string

    @IsString() @MinLength(3) @MaxLength(100)
    address: string

    @IsString()
    country: string
    }
