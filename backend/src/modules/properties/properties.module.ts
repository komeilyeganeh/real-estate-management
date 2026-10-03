import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { PropertiesRepository } from './properties.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PropertiesService, PropertiesRepository, PrismaService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
