import { Controller, Get, Post, Body, Put, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signupdto';
import { LoginDto } from './dto/logindto';
import { RefreshTokenDto } from './dto/refresh-tokensdto';
import { ForgetPasswordDto } from './dto/forget-passworddto';
import { ChangePasswordDto } from './dto/change-passworddto';
import { AuthGuard } from 'src/guards/auth.guards';
import { ResetPasswordDto } from './dto/reset-passworddto';

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
 
@UseGuards(AuthGuard)
@Put('change-password')
async changePassword(
  @Body() changePasswordDto: ChangePasswordDto,
  @Req() req,
) {
  return this.authService.changePassword(
    req.userId,
    changePasswordDto.oldPassword,
    changePasswordDto.newPassword,
  );
}
  @Post('forgot-password')
  async forgetPassword (@Body() forgetPasswordDto:ForgetPasswordDto){
    return this.authService.forgetPassword(forgetPasswordDto.email)
  }

  @Put('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }
}
