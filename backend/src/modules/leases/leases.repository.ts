import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';

@Injectable()
export class LeasesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLeaseDto) {
    return this.prisma.lease.create({
      data: dto,
    });
  }

  createLeaseWithTransaction(dto: CreateLeaseDto) {
    return this.prisma.$transaction(async (tx) => {
      const unit = await tx.unit.findUnique({ where: { id: dto.unitId } });
      if (!unit) {
        throw new NotFoundException('Unit not found');
      }
      const tenant = await tx.tenant.findUnique({
        where: { id: dto.tenantId },
      });
      if (!tenant) {
        throw new NotFoundException('Tenant not found');
      }
      if (unit.status !== 'AVAILABLE') {
        throw new ConflictException('This unit is not available for rent.');
      }
      const activeLeaseByUnit = await tx.lease.findFirst({
        where: {
          unitId: dto.unitId,
          status: 'ACTIVE',
        },
      });
      if (activeLeaseByUnit) {
        throw new ConflictException('This unit already has an active lease.');
      }
      const activeLeaseByTenant = await tx.lease.findFirst({
        where: {
          tenantId: dto.tenantId,
          status: 'ACTIVE',
        },
      });
      if (activeLeaseByTenant) {
        throw new ConflictException('This tenant already has an active lease.');
      }
      const createdLease = await tx.lease.create({
        data: dto,
      });
      await tx.unit.update({
        where: { id: dto.unitId },
        data: { status: 'RENTED' },
      });
      return createdLease;
    });
  }

  findUnit(unitId: number) {
    return this.prisma.unit.findUnique({ where: { id: unitId } });
  }

  findTenant(tenantId: number) {
    return this.prisma.tenant.findUnique({ where: { id: tenantId } });
  }

  findActiveLeaseByUnit(unitId: number) {
    return this.prisma.lease.findFirst({
      where: { unitId },
    });
  }
  findActiveLeaseByTenant(tenantId: number) {
    return this.prisma.lease.findFirst({
      where: { tenantId },
    });
  }

  findAll() {
    return this.prisma.lease.findMany();
  }

  findById(id: number) {
    return this.prisma.lease.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdateLeaseDto) {
    return this.prisma.lease.update({
      where: { id },
      data: dto,
    });
  }

  async terminateWithTransaction(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const lease = await tx.lease.update({
        where: { id },
        data: {
          status: 'TERMINATED',
        },
      });

      await tx.unit.update({
        where: { id: lease.unitId },
        data: {
          status: 'AVAILABLE',
        },
      });

      return lease;
    });
  }
}
