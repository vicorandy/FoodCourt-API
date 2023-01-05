import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddonsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  category?: string;

  @IsNotEmpty()
  id: number;
}
