import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TenantsRepository } from './tenants.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async create(dto: CreateTenantDto) {
    const tenant = await this.tenantsRepository.findByEmail(dto.email);
    if (tenant) {
      throw new ConflictException('A tenant with this email already exists');
    }
    return this.tenantsRepository.create(dto);
  }

  findAll() {
    return this.tenantsRepository.findAll();
  }

  async findById(id: number) {
    const tenant = await this.tenantsRepository.findById(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async update(id: number, dto: UpdateTenantDto) {
    await this.findById(id);
    return this.tenantsRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    const lease =
      await this.tenantsRepository.findAnyLeaseByTenantId(id);
    if (lease) {
      throw new ConflictException(
        'This tenant cannot be deleted because they have associated leases',
      );
    }
    return this.tenantsRepository.delete(id);
  }
}
