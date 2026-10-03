import { Injectable } from '@nestjs/common';
import { TenantsRepository } from './tenants.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  create(dto: CreateTenantDto) {
    return this.tenantsRepository.create(dto);
  }
}
