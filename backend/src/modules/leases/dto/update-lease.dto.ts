import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsDecimal, IsOptional } from 'class-validator';

export class UpdateLeaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDecimal()
  monthlyRent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDecimal()
  deposit?: string;
}