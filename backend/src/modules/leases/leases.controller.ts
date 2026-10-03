import { Body, Controller, Post } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Leases")
@Controller('leases')
export class LeasesController {
    constructor(private readonly leasesService: LeasesService) {}

    @ApiOperation({
        summary: "Create a lease"
    })
    @Post()
    create(@Body() dto: CreateLeaseDto) {
        return this.leasesService.create(dto)
    }
}
