import { Injectable } from '@nestjs/common';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { LeasesRepository } from './leases.repository';

@Injectable()
export class LeasesService {
    constructor(private readonly leasesRepository: LeasesRepository) {}

    async create(dto: CreateLeaseDto) {
        return this.leasesRepository.createLeaseWithTransaction(dto)
    }
}
