import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUnitDto } from './dto/update-unit.dto';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @ApiOperation({
    summary: 'Create a unit',
  })
  @Post()
  create(@Body() dto: CreateUnitDto) {
    return this.unitsService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all units',
  })
  @Get()
  findAll() {
    return this.unitsService.findAll();
  }

  @ApiOperation({
    summary: 'Get a unit by id',
  })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.unitsService.findById(id);
  }

  @ApiOperation({
    summary: 'Update a unit',
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUnitDto) {
    return this.unitsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a unit',
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.unitsService.delete(id);
  }
}
