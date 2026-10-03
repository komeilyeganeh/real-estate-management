import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';

@Injectable()
export class UnitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUnitDto) {
    return this.prisma.unit.create({
      data: dto,
    });
  }

  findProperty(propertyId: number) {
    return this.prisma.property.findUnique({ where: { id: propertyId } });
  }
}
