import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { QueryDto } from '../../common/dto/query.dto';
import { Prisma } from '../../../generated/prisma/client';

@Injectable()
export class PropertiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: dto,
    });
  }

  async findAll({ page, limit, search }: QueryDto) {
    const skip = (page - 1) * limit;
    const where: Prisma.PropertyWhereInput | undefined = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              address: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }
      : undefined;
    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.property.count({ where }),
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
    return this.prisma.property.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdatePropertyDto) {
    return this.prisma.property.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
