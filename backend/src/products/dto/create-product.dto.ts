import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  sku!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  category!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiProperty()
  @IsString()
  imageUrl!: string;

  @ApiProperty({ enum: ['In stock', 'Low stock', 'Out of stock'] })
  @IsEnum(['In stock', 'Low stock', 'Out of stock'])
  status!: 'In stock' | 'Low stock' | 'Out of stock';

  @ApiProperty()
  @IsNumber()
  @Min(0)
  rating!: number;
}
