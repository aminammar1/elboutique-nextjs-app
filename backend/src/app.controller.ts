import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  someProtedRoute(@Req() req) {
    return { message: 'Accessed Ressource', userId: req.userId };
  }
}
