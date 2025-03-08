import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UploadService } from 'src/upload/upload.service';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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
        throw new NotFoundException('User not found');
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

    /** Update User Details  */
    async updateUserDetails(userId: string, data: any) {
    try {
        const user = await this.UserModel.findByIdAndUpdate(userId, data, {new: true,});

        if (!user) {
        throw  new NotFoundException('User not found');
        }

        return {
        message: 'User details updated successfully',
        success: true,
        error: false,};
    } catch (error) {
        throw new Error(error.message || 'Failed to update user details');
    }} 

    /** Change Password */
    async changePassword(userId: string, oldPassword: string, newPassword: string) {
    try {
        const user = await this.UserModel.findById(userId);

        if (!user) {
        throw new NotFoundException('User not found');
        }
        const isPasswordMatch = await bcrypt.compare (oldPassword , user.password);

        if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid old password');
        }
        user.password =  await bcrypt.hash(newPassword, 10);
        await user.save();

        return {
        message: 'Password changed successfully',
        success: true,
        error: false,
        };
    }
    catch (error) {
        throw new Error(error.message || 'Failed to change password');
    }
    }


    /** Delete User */
    async deleteUser(userId: string) {
    try {
        const user = await this.UserModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.UserModel.deleteOne({ _id: userId });
        

        return {
        message: 'User deleted successfully',
        success: true,
        error: false,
        };
    } catch (error) {
        throw new Error(error.message || 'Failed to delete user');
    }
    }
}


