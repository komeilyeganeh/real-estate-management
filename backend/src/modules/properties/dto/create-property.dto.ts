import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  address!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description!: string;
}
