import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signupdto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { LoginDto } from './dto/logindto';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressResponse } from 'express';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private UserModel: Model<User>,
    @InjectModel(ResetToken.name)
    private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailService,
    private uploadService: UploadService,
  ) {}

  /** SignUp */
  async signup(signupData: SignUpDto) {
    const { name, email, password, confirmPassword , terms } = signupData;

    if (password !== confirmPassword) {
      throw new HttpException(
        { message: 'Passwords do not match', success: false, error: true },
        HttpStatus.BAD_REQUEST,
      );
    }

    const emailInUse = await this.UserModel.findOne({ email });
    if (emailInUse) {
      throw new HttpException(
        { message: 'Email already in use', success: false, error: true },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
      success: true,
      error: false,
      data: { user: newUser },
    };
  }
  
  /**Login  */
  async login(Credentials: LoginDto, res: ExpressResponse) {
    const { email, password } = Credentials;
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    await this.UserModel.findByIdAndUpdate(user._id, { last_login_date: new Date() });

    const tokens = this.generateTokens(user._id.toString());

    // Set tokens in secure HTTP-only cookies
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    return {
      message: 'Logged in successfully',
      success: true,
      userId: user._id,
    };
  }

  async refreshTokens(refreshToken: string, res: ExpressResponse) {
    try {
      const payload = this.jwtService.verify(refreshToken);
  
      const tokens = this.generateTokens(payload.userId);
  
      res.cookie('access_token', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      });
  
      return res.status(200).json({ message: 'Tokens refreshed successfully', success: true , tokens });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid refresh token', success: false });
    }
  }

  private generateTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '3d' });

    return { accessToken, refreshToken };
  }


  /**Forget Password */
  async requestPasswordReset(email: string) {
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Email not exist',
        success: false,
        error: true,
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 min

    // Save OTP in database
    await this.ResetTokenModel.create({
      token: otp,
      userId: user._id,
      expiryDate,
    });

    // Send OTP via email
    await this.mailService.sendOTPEmail(email, otp);

    return { message: 'If this email exists, an OTP has been sent.'  , success: true, error: false };
  }

  /** Verify OTP */
  async verifyOTP(email: string, otp: string) {
    const user = await this.UserModel.findOne({ email });
    
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
        success: false,
        error: true,
      });
    }

    // Find OTP record
    const token = await this.ResetTokenModel.findOne({
      token: otp,
      userId: user._id,
      expiryDate: { $gte: new Date() }, // Ensure OTP is not expired
    });

    if (!token) {
      throw new UnauthorizedException({
        message: 'Invalid or expired OTP',
        success: false,
        error: true,
      });
    }

    // Delete OTP after verification
    await this.ResetTokenModel.deleteOne({ _id: token._id });

    return {
      message: 'OTP verified successfully. You can now reset your password.',
      userId: user._id,
    };
  }

  /** Reset Password */
  async resetPassword(userId: string, newPassword: string , confirmPassword: string) {
    
    if (newPassword !== confirmPassword) {
      throw new BadRequestException({ message: 'Passwords do not match' , success: false, error: true
      });
    }
    
    const user = await this.UserModel.findById(userId);
    
    if (!user) {
      throw new UnauthorizedException({ message : 'User not found' , success: false, error: true });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: 'Password reset successfully' , success: true, error: false };
  }

  /** Upload User Image  */

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    try {
      const uploadResult = await this.uploadService.uploadImage(file, 'avatars');

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
      const user = await this.UserModel.findById(userId).select('-password'); // Exclude password
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user details');
    }
  }
}
