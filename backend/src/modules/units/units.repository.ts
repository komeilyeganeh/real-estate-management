import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { QueryDto } from '../../common/dto/query.dto';
import { Prisma } from '../../../generated/prisma/client';

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

  async findAll({ page, limit, search }: QueryDto) {
    const skip = (page - 1) * limit;

    const floor = Number(search);

    const where: Prisma.UnitWhereInput | undefined = search
      ? {
          OR: [
            {
              unitNumber: {
                contains: search,
                mode: 'insensitive',
              },
            },
            ...(Number.isInteger(floor) ? [{ floor }] : []),
          ],
        }
      : undefined;

    const [data, total] = await Promise.all([
      this.prisma.unit.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.unit.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
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
