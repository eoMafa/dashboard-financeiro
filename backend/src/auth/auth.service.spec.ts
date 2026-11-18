import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';

const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register não deve devolver a senha', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: '1',
      name: 'Ana',
      email: 'ana@teste.com',
    });

    await service.register({
      name: 'Ana',
      email: 'ana@teste.com',
      password: '123456',
    });

    expect(prismaMock.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        select: { id: true, name: true, email: true },
      }),
    );
  });
  it('register deve recusar e-mail já cadastrado', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'ana@teste.com',
    });

    await expect(
      service.register({
        name: 'Ana',
        email: 'ana@teste.com',
        password: '123456',
      }),
    ).rejects.toThrow(ConflictException);
  });
});
