import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateLeaseDto } from './dto/update-lease.dto';

@ApiTags('Leases')
@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @ApiOperation({
    summary: 'Create a lease',
  })
  @Post()
  create(@Body() dto: CreateLeaseDto) {
    return this.leasesService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all leases',
  })
  @Get()
  findAll() {
    return this.leasesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a lease by id',
  })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.leasesService.findById(id);
  }

  @ApiOperation({
    summary: 'Update a lease',
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLeaseDto) {
    return this.leasesService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Terminate a lease',
  })
  @Patch(':id/terminate')
  terminate(@Param('id', ParseIntPipe) id: number) {
    return this.leasesService.terminate(id);
  }
}
