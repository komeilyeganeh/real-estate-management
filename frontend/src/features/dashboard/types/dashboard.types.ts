export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Property {
  id: number;
  name: string;
  address: string;
  description?: string | null;
}

export interface Unit {
  id: number;
  unitNumber: string;
  floor: number;
  area: number | string;
  bedrooms: number;
  monthlyRent: number | string;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | string;
  propertyId: number;
}

export interface Tenant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Lease {
  id: number;
  unitId: number;
  tenantId: number;
  startDate: string;
  endDate: string;
  monthlyRent: number | string;
  deposit: number | string;
  status: "ACTIVE" | "TERMINATED" | string;
  createdAt: string;
  tenant: Tenant;
  unit: Unit & {
    property: Property;
  };
}

export interface DashboardData {
  totalProperties: number;
  totalUnits: number;
  totalTenants: number;
  activeLeases: number;
  occupiedUnits: number;
  availableUnits: number;
  occupancyRate: number;
  recentLeases: Lease[];
}

export interface DashboardStats {
  totalProperties: number;
  totalUnits: number;
  totalTenants: number;
  activeLeases: number;
  rentedUnits: number;
  availableUnits: number;
  maintenanceUnits: number;
  occupancyRate: number;
}
