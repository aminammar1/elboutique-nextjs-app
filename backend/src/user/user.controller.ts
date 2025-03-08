import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Param,
  Res,
  Req,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guards';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** Upload User Image */
  @Get('fetch-user-details')
  @UseGuards(AuthGuard)
  async fetchUserDetails(@Req() req: Request) {
    const userId = req.userId; // Get userId from the AuthGuard
    return this.userService.fetchUserDetails(userId);
  }

  /** Profile Avatar Upload  */

  @Put('upload-avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(req.userId, file);
  }

  /** Update User Profile */
  @Put('update-profile')
  @UseGuards(AuthGuard)
  async updateUserDetails(@Req() req: Request, @Body() body: any) {
    return this.userService.updateUserDetails(req.userId, body);
  }

  /** Change Password */
  @Put('change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Req() req: Request,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.userService.changePassword(
      req.userId,
      oldPassword,
      newPassword,
    );
  }

  /** delete User */
  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteUser(@Req() req: Request) {
    return this.userService.deleteUser(req.userId);
  }
}
