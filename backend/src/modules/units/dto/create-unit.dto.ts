import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  unitNumber!: string;
  @IsInt()
  floor!: number;
  @IsDecimal()
  area!: string;
  @IsInt()
  bedrooms!: number;
  @IsDecimal()
  monthlyRent!: string;
  @IsInt()
  propertyId!: number;
}
