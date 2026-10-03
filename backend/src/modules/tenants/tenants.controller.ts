import { Body, Controller, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Tenants")
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @ApiOperation({
    summary: "Create a tenant"
  })
  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.create(dto);
  }
}
