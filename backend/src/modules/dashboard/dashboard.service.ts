import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [
      totalProperties,
      totalUnits,
      totalTenants,
      activeLeases,
      rentedUnits,
      availableUnits,
      maintenanceUnits,
    ] = await Promise.all([
      this.prisma.property.count(),
      this.prisma.unit.count(),
      this.prisma.tenant.count(),
      this.prisma.lease.count({
        where: { status: 'ACTIVE' },
      }),
      this.prisma.unit.count({
        where: { status: 'RENTED' },
      }),
      this.prisma.unit.count({
        where: { status: 'AVAILABLE' },
      }),
      this.prisma.unit.count({
        where: { status: 'MAINTENANCE' },
      }),
    ]);

    return {
      totalProperties,
      totalUnits,
      totalTenants,
      activeLeases,
      rentedUnits,
      availableUnits,
      maintenanceUnits,
      occupancyRate:
        totalUnits > 0
          ? Math.round((rentedUnits / totalUnits) * 100)
          : 0,
    };
  }
}