import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitsRepository } from './units.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, UnitsRepository, PrismaService]
})
export class UnitsModule {}
