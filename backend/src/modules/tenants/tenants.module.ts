import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantsRepository } from './tenants.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [TenantsService, TenantsRepository, PrismaService],
  controllers: [TenantsController]
})
export class TenantsModule {}
