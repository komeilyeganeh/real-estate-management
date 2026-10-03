import { Body, Controller, Post } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';

@Controller('leases')
export class LeasesController {
    constructor(private readonly leasesService: LeasesService) {}

    @Post()
    create(@Body() dto: CreateLeaseDto) {
        return this.leasesService.create(dto)
    }
}
