import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.tenant.findMany();
  }

  findById(id: number) {
    return this.prisma.tenant.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.tenant.findUnique({
      where: { email },
    });
  }

  findAnyLeaseByTenantId(tenantId: number) {
    return this.prisma.lease.findFirst({
      where: { tenantId },
    });
  }

  update(id: number, dto: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.tenant.delete({
      where: { id },
    });
  }
}
