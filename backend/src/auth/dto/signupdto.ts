import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Full name is required' })
  name: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty({ message: 'Confirm Password is required' })
  confirmPassword: string; // Add this field

  @IsNotEmpty({ message: 'You must accept the Terms & Conditions' })
  terms: boolean;
}