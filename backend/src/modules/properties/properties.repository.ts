import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: dto,
    });
  }
}
