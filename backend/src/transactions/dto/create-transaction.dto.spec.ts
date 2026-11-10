import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

describe('CreateTransactionDto', () => {
  it('recusa um type que não seja income ou expense', async () => {
    const dto = plainToInstance(CreateTransactionDto, {
      title: 'Pizza',
      amount: 50,
      type: 'presente',
    });

    const errors = await validate(dto);

    expect(errors.map((e) => e.property)).toContain('type');
  });

  it('recusa um amount que não seja um número positivo', async () => {
    const dto = plainToInstance(CreateTransactionDto, {
      title: 'Salário',
      amount: -50,
      type: 'income',
    });

    const errors = await validate(dto);

    expect(errors.map((e) => e.property)).toContain('amount');
  });

  it('aceita uma transação válida', async () => {
    const dto = plainToInstance(CreateTransactionDto, {
      title: 'Conta Energia',
      amount: 503.12,
      type: 'expense',
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
