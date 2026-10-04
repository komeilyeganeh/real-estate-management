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
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @ApiOperation({
    summary: 'Create a tenant',
  })
  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all tenants',
  })
  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @ApiOperation({
    summary: 'Get a tenant by id',
  })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.findById(id);
  }

  @ApiOperation({
    summary: 'Update a tenant',
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a tenant',
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tenantsService.delete(id);
  }
}
