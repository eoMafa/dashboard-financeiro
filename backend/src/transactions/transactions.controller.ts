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

import { CreateTransactionDto } from './dto/create-transaction.dto';

import type { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() body: CreateTransactionDto,
  ) {
    return this.transactionsService.create(req.user.userId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    return this.transactionsService.findAll(req.user.userId);
  }
}
