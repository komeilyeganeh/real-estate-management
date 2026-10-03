import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { LeasesRepository } from './leases.repository';

@Injectable()
export class LeasesService {
    constructor(private readonly leasesRepository: LeasesRepository) {}

    async create(dto: CreateLeaseDto) {
        const unit = await this.leasesRepository.findUnit(dto.unitId)
        const tenant = await this.leasesRepository.findTenant(dto.tenantId)
        if (!unit) {
            throw new NotFoundException("Unit not found")
        }
        if (!tenant) {
            throw new NotFoundException("Tenant not found")
        }
        if (unit.status !== "AVAILABLE") {
            throw new ConflictException("This unit is not available for rent.")
        }
        return this.leasesRepository.create(dto)
    }
}
