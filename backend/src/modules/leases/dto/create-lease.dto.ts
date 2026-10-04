import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsInt, IsString } from "class-validator";

export class CreateLeaseDto {
    @ApiProperty()
    @IsInt()
    unitId!: number;

    @ApiProperty()
    @IsInt()
    tenantId!: number;

    @ApiProperty()
    @IsDateString()
    startDate!: string;

    @ApiProperty()
    @IsDateString()
    endDate!: string;

    @ApiProperty()
    @IsDecimal()
    monthlyRent!: string;

    @ApiProperty()
    @IsDecimal()
    deposit!: string;
}