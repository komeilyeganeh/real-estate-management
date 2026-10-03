import { Body, Controller, Post } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Units")
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @ApiOperation({
    summary: "Create a unit"
  })
  @Post()
  create(@Body() dto: CreateUnitDto) {
    return this.unitsService.create(dto);
  }
}
