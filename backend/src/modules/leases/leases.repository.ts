import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';

@Injectable()
export class LeasesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLeaseDto) {
    return 'DB: created';
  }

  findUnit(unitId: number) {
    return this.prisma.unit.findUnique({ where: { id: unitId } });
  }

  findTenant(tenantId: number) {
    return this.prisma.tenant.findUnique({ where: { id: tenantId } });
  }
}
