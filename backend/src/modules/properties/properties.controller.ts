import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryDto } from '../../common/dto/query.dto';

@ApiTags("Properties")
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @ApiOperation({
    summary: "Create a property"
  })
  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.propertiesService.create(dto);
  }

  @ApiOperation({ summary: 'Get all properties' })
  @Get()
  findAll(@Query() dto: QueryDto) {
    return this.propertiesService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get a property by ID' })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.propertiesService.findById(id);
  }

  @ApiOperation({ summary: 'Update a property' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a property' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.propertiesService.delete(id);
  }
}
