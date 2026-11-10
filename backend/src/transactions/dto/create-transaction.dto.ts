import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount!: number;

  @IsIn(['income', 'expense'])
  type!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  category!: string;
}
