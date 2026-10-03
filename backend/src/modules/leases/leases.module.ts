import { Module } from '@nestjs/common';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';
import { LeasesRepository } from './leases.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LeasesController],
  providers: [LeasesService, LeasesRepository, PrismaService]
})
export class LeasesModule {}
