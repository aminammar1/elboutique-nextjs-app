import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signupdto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/logindto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import {v4 as uuidv4} from 'uuid'
import { nanoid } from 'nanoid';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
@Injectable()
export class AuthService {
  constructor(
  @InjectModel(User.name)private UserModel: Model<User>,
  @InjectModel(RefreshToken.name)private RefreshTokenModel: Model<RefreshToken>,
  @InjectModel(ResetToken.name)private ResetTokenModel: Model<ResetToken>,
  private jwtService: JwtService,
  private mailService: MailService,
  ){}

  async signup(signupData: SignUpDto) {
    const {email, password, name}= signupData
    const emailInUse= await this.UserModel.findOne({email})
    if(emailInUse){
      throw new BadRequestException('Email already in use')
    }

    const hashedPassword =await bcrypt.hash(password,10)
    await this.UserModel.create({
      name,
      email,
      password:hashedPassword
    })
}

async login(Credentials: LoginDto){
  const {email, password}= Credentials
  const user= await this.UserModel.findOne({email})
  if(!user){
    throw new UnauthorizedException("Wrong credentials")
  }


const passwordMatch = await bcrypt.compare(password, user.password);
if(!passwordMatch){
  throw new UnauthorizedException('wrong credentials')
}
const tokens = await this.generateUserTokens(user._id)
return {
  ...tokens,
  userId:user._id
}}

async refreshTokens(refreshToken:string){
  const token= await this.RefreshTokenModel.findOneAndDelete(
    {
      token: refreshToken,
      expiryDate: {$gte : new Date()}
    }
  )
if (!token){
  throw new UnauthorizedException("refresh token is invalid")
}
return this.generateUserTokens(token.userId)
}

async generateUserTokens(userId){
  const accessToken= this.jwtService.sign({userId},{expiresIn:'1h'})
  const refreshToken=uuidv4()
  await this.storeRefreshToken(refreshToken, userId)
  return{
  accessToken,
  refreshToken
}
}

async storeRefreshToken(token:string, userId){
  const expiryDate= new Date()
  expiryDate.setDate(expiryDate.getDate()+3)
  await this.RefreshTokenModel.create({token, userId, expiryDate})
}

async forgetPassword(email:string){
  const user = await this.UserModel.findOne({email})
  if (user){
    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours()+1)
      const resetToken = nanoid(64)
      await this.ResetTokenModel.create({
        token: resetToken,
        userId:user._id,
        expiryDate,
      })
      this.mailService.sendPasswordResetEmail(email,resetToken)
    }
  return {"message":"if this user exists, they will receive an email"}
}

async changePassword(userId, oldPassword: string, newPassword: string) {
}

async resetPassword(newPassword: string, resetToken: string) {
  //Find a valid reset token document
  const token = await this.ResetTokenModel.findOneAndDelete({
    token: resetToken,
    expiryDate: { $gte: new Date() },
  });

  if (!token) {
    throw new UnauthorizedException('Invalid link');
  }

  //Change user password (MAKE SURE TO HASH!!)
  const user = await this.UserModel.findById(token.userId);
  if (!user) {
    throw new InternalServerErrorException();
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
}

}