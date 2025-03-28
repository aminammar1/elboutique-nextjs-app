import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UploadService } from 'src/upload/upload.service';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService , UploadService , MailService],  
})
export class UserModule {}
