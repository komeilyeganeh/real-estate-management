import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { LeasesRepository } from './leases.repository';
import { UpdateLeaseDto } from './dto/update-lease.dto';

@Injectable()
export class LeasesService {
  constructor(private readonly leasesRepository: LeasesRepository) {}

  async create(dto: CreateLeaseDto) {
    return this.leasesRepository.createLeaseWithTransaction(dto);
  }

  findAll() {
    return this.leasesRepository.findAll();
  }

  async findById(id: number) {
    const lease = await this.leasesRepository.findById(id);
    if (!lease) {
      throw new NotFoundException('Lease not found');
    }
    return lease;
  }

  async update(id: number, dto: UpdateLeaseDto) {
    const lease = await this.findById(id);

    const startDate = dto.startDate ? new Date(dto.startDate) : lease.startDate;

    const endDate = dto.endDate ? new Date(dto.endDate) : lease.endDate;

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date.');
    }

    return this.leasesRepository.update(id, dto);
  }

  async terminate(id: number) {
    const lease = await this.findById(id);

    if (lease.status !== 'ACTIVE') {
      throw new ConflictException('Only active leases can be terminated.');
    }

    return this.leasesRepository.terminateWithTransaction(id);
  }
}
