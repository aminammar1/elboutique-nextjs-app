import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Request } from 'express'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    if (!request.userId) {
        throw new ForbiddenException('Unauthorized access you are not Admin ')
    }

    const user = await this.userModel.findById(request.userId)

    if (!user || user.role !== 'ADMIN') {
        throw new ForbiddenException('Permission denied')
    }

    return true 
    }
}
