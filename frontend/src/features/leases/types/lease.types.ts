export type LeaseStatus = "ACTIVE" | "EXPIRED" | "TERMINATED";

export interface LeaseTenant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface LeaseProperty {
  id: number;
  name: string;
  address: string;
}

export interface LeaseUnit {
  id: number;
  unitNumber: string;
  floor: number;
  area: number | string;
  bedrooms: number;
  monthlyRent: number | string;
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  propertyId: number;
  property?: LeaseProperty;
}

export interface Lease {
  id: number;
  unitId: number;
  tenantId: number;
  startDate: string;
  endDate: string;
  monthlyRent: number | string;
  deposit: number | string;
  status: LeaseStatus;
  createdAt: string;
  updatedAt: string;
  tenant?: LeaseTenant;
  unit?: LeaseUnit;
}

export interface CreateLeasePayload {
  unitId: number;
  tenantId: number;
  startDate: string;
  endDate: string;
  monthlyRent: string;
  deposit: string;
}

export interface UpdateLeasePayload {
  startDate?: string;
  endDate?: string;
  monthlyRent?: string;
  deposit?: string;
}

export interface TenantOption {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UnitOption {
  id: number;
  unitNumber: string;
  floor: number;
  bedrooms: number;
  monthlyRent: number | string;
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  property?: LeaseProperty;
}