import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionsService: TransactionsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req: any,
    @Body() body: any,
  ) {
    return this.transactionsService.create(
      req.user.userId,
      body,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req: any) {
    return this.transactionsService.findAll(
      req.user.userId,
    );
  }
}