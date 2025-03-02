import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // 🔥 Check both cookies and Authorization header
    const token = request.cookies?.access_token || request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.userId = payload.userId;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
