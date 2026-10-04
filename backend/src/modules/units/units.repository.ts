import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUnitDto) {
    return this.prisma.unit.create({
      data: dto,
    });
  }

  findLeaseByUnitId(unitId: number) {
    return this.prisma.lease.findFirst({
      where: { unitId },
    });
  }

  findProperty(propertyId: number) {
    return this.prisma.property.findUnique({ where: { id: propertyId } });
  }

  findAll() {
    return this.prisma.unit.findMany();
  }

  findById(id: number) {
    return this.prisma.unit.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdateUnitDto) {
    return this.prisma.unit.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.unit.delete({
      where: { id },
    });
  }
}
