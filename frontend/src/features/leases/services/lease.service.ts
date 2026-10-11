import { client } from "../../../services/api/client";
import type {
  CreateLeasePayload,
  Lease,
  TenantOption,
  UnitOption,
  UpdateLeasePayload,
} from "../types/lease.types";

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const leaseService = {
  async getAll(): Promise<Lease[]> {
    const response = await client.get<Lease[]>("/leases");
    return response.data;
  },

  async getById(id: number): Promise<Lease> {
    const response = await client.get<Lease>(`/leases/${id}`);
    return response.data;
  },

  async create(payload: CreateLeasePayload): Promise<Lease> {
    const response = await client.post<Lease>("/leases", payload);
    return response.data;
  },

  async update(
    id: number,
    payload: UpdateLeasePayload,
  ): Promise<Lease> {
    const response = await client.patch<Lease>(
      `/leases/${id}`,
      payload,
    );
    return response.data;
  },

  async terminate(id: number): Promise<Lease> {
    const response = await client.patch<Lease>(
      `/leases/${id}/terminate`,
    );
    return response.data;
  },

  async getTenants(): Promise<TenantOption[]> {
    const response = await client.get<TenantOption[]>("/tenants");
    return response.data;
  },

  async getUnits(): Promise<UnitOption[]> {
    const response = await client.get<PaginatedResponse<UnitOption>>(
      "/units",
      {
        params: {
          page: 1,
          limit: 100,
        },
      },
    );

    return response.data.data;
  },
};