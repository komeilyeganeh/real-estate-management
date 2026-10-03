import { Injectable, NotFoundException } from '@nestjs/common';
import { UnitsRepository } from './units.repository';
import { CreateUnitDto } from './dto/create-unit.dto';

@Injectable()
export class UnitsService {
    constructor(private readonly unitsRepository: UnitsRepository) {}

    async create(dto: CreateUnitDto) {
        const property = await this.unitsRepository.findProperty(dto.propertyId)
        if (!property) {
            throw new NotFoundException("Property not found")
        }
        return this.unitsRepository.create(dto)
    }
}
