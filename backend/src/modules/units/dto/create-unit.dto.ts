import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unitNumber!: string;

  @ApiProperty()
  @IsInt()
  floor!: number;

  @ApiProperty()
  @IsDecimal()
  area!: string;

  @ApiProperty()
  @IsInt()
  bedrooms!: number;

  @ApiProperty()
  @IsDecimal()
  monthlyRent!: string;

  @ApiProperty()
  @IsInt()
  propertyId!: number;
}
