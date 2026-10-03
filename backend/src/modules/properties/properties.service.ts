import { Injectable } from '@nestjs/common';
import { PropertiesRepository } from './properties.repository';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly propertiesRepository: PropertiesRepository) {}

  create(dto: CreatePropertyDto) {
    return this.propertiesRepository.create(dto);
  }
}
