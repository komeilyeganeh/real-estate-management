import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.property.findMany();
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
