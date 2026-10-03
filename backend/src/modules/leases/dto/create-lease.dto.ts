import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateLeaseDto {
    @IsInt()
    unitId!: number;
    @IsInt()
    tenantId!: number;
    @IsDateString()
    startDate!: string;
    @IsDateString()
    endDate!: string;
    @IsString()
    monthlyRent!: string;
    @IsString()
    deposit!: string;
}