import { Controller, Get, Post, Body, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signupdto';
import { LoginDto } from './dto/logindto';
import { ChangePasswordDto } from './dto/change-passworddto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshToken } from './schemas/refresh-token.schema';
import { RefreshTokenDto } from './dto/refresh-tokensdto';
import { ForgetPasswordDto } from './dto/forget-passworddto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignUpDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  async login (@Body() Credentials:LoginDto){
  return this.authService.login(Credentials);}

 @Post('refresh')
 async refreshToken (@Body() refreshTokenDto:RefreshTokenDto){
  return this.authService.refreshTokens(refreshTokenDto.refreshToken)
}
 
  @Post('forget-password')
  async forgetPassword (@Body() forgetPasswordDto:ForgetPasswordDto){
    return this.authService.forgetPassword(forgetPasswordDto.email)
  }
}
