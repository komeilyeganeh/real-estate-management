import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UnitsRepository } from './units.repository';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(private readonly unitsRepository: UnitsRepository) {}

  async create(dto: CreateUnitDto) {
    const property = await this.unitsRepository.findProperty(dto.propertyId);
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return this.unitsRepository.create(dto);
  }

  findAll() {
    return this.unitsRepository.findAll();
  }

  async findById(id: number) {
    const unit = await this.unitsRepository.findById(id);
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }
    return unit;
  }

  async update(id: number, dto: UpdateUnitDto) {
    await this.findById(id);
    return this.unitsRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    const activeLeases = await this.unitsRepository.findLeaseByUnitId(id);
    if (activeLeases) {
      throw new ConflictException(
        'This unit cannot be deleted because it has associated leases.',
      );
    }
    return this.unitsRepository.delete(id);
  }
}
