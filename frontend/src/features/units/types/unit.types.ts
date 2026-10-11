export type UnitStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE";

export interface UnitProperty {
  id: number;
  name: string;
  address: string;
}

export interface Unit {
  id: number;
  unitNumber: string;
  floor: number;
  area: string | number;
  bedrooms: number;
  monthlyRent: string | number;
  status: UnitStatus;
  propertyId: number;
  property: UnitProperty;
  createdAt: string;
  updatedAt: string;
}

export interface UnitsResponse {
  data: Unit[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UnitPayload {
  unitNumber: string;
  floor: number;
  area: string;
  bedrooms: number;
  monthlyRent: string;
  propertyId: number;
}

export interface UpdateUnitPayload {
  unitNumber: string;
  floor: number;
  area: string;
  bedrooms: number;
  monthlyRent: string;
}