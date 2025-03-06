import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UploadService } from 'src/upload/upload.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
    private uploadService: UploadService,
    ) {}

  /** Upload User Image  */

async uploadAvatar(userId: string, file: Express.Multer.File) {
    try {
    const uploadResult = await this.uploadService.uploadImage(
        file,
        'avatars',
    );
    await this.UserModel.findByIdAndUpdate(userId, {
        avatar: uploadResult.url,
    });

    return {
        message: 'Avatar uploaded successfully',
        success: true,
        error: false,
        data: {
            _id: userId,
            avatar: uploadResult.url,
        },
        };
    } catch (error) {
        throw new Error(error.message || 'Internal Server Error');
    }
    }

  /** Fetch User Details  */

    async fetchUserDetails(userId: string) {
    try {
        const user = await this.UserModel.findById(userId)
        .select('-password') // Exclude password
        .lean();

        if (!user) {
        throw new Error('User not found');
        }

        return {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        };
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch user details');
    }
    }
}
