import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';

import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.userId);
  }
}
