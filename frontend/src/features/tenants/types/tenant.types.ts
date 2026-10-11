export interface Tenant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface TenantPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}