import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

const prismaMock = {
  user: {
    findUnique: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findById deve retornar o usuário sem a senha', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      name: 'Ana',
      email: 'ana@example.com',
    });

    await service.findById('1');

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
      select: { id: true, name: true, email: true },
    });
  });
});
