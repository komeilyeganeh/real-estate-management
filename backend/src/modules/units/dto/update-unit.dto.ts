import { IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUnitDto {
  @IsOptional()
  @IsString()
  unitNumber?: string;

  @IsOptional()
  @IsInt()
  floor?: number;

  @IsOptional()
  @IsDecimal()
  area?: string;

  @IsOptional()
  @IsInt()
  bedrooms?: number;

  @IsOptional()
  @IsDecimal()
  monthlyRent?: string;
}