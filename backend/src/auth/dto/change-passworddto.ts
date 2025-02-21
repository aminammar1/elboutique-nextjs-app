import { IsEmail, IsString} from "class-validator"

export class ChangePasswordDto{

@IsEmail()
oldPassword:string

@IsString()
newPassword: string
}