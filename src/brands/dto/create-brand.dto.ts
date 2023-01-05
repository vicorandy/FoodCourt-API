import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
