import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    return this.prisma.transaction.create({
      data: {
        title: data.title,
        amount: data.amount,
        type: data.type,
        category: data.category,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}