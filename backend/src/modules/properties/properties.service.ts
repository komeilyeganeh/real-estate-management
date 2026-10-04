import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertiesRepository } from './properties.repository';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { QueryDto } from '../../common/dto/query.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  create(dto: CreatePropertyDto) {
    return this.propertiesRepository.create(dto);
  }

  findAll(dto: QueryDto) {
    return this.propertiesRepository.findAll(dto);
  }

  async findById(id: number) {
    const property = await this.propertiesRepository.findById(id);
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async update(id: number, dto: UpdatePropertyDto) {
    await this.findById(id);
    return this.propertiesRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.propertiesRepository.delete(id);
  }
}
