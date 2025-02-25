import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    @InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  /** SignUp */
  async signup(signupData: SignUpDto) {
    const { name, email, password, confirme_Password } = signupData;

    if (password !== confirme_Password) {
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
  async login(Credentials: LoginDto) {
    const { email, password } = Credentials;
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Wrong credentials',
        success: false,
        error: true,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException({
        message: 'Wrong credentials',
        success: false,
        error: true,
      });
    }
    const updateUser = await this.UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });
    const tokens = await this.generateUserTokens(user._id);
    return {
      message: 'Logged in successfully',
      success: true,
      error: false,
      ...tokens,
      userId: user._id,
    };
  }

  /**Refresh Token */
  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOneAndDelete({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });
    if (!token) {
      throw new UnauthorizedException('refresh token is invalid');
    }
    return this.generateUserTokens(token.userId);
  }

  /**Generate User Tokens */
  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  /**Store Refresh Token */
  async storeRefreshToken(token: string, userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.RefreshTokenModel.create({ token, userId, expiryDate });
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

    return { message: 'If this email exists, an OTP has been sent.' };
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
}
