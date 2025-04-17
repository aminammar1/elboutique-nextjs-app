import { IsString, MinLength, MaxLength } from 'class-validator'



    export class VerifyCouponDto {
    @IsString({ message: 'Code must be a string' })
    @MinLength(3, { message: 'must have at least 3 characters' })
    @MaxLength(20, { message: 'Maximum 20 characters' })
    code: string
    }
