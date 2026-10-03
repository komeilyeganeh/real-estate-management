import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: dto,
    });
  }
}
