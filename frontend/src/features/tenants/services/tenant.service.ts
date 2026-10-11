import { client } from "../../../services/api/client";

import type { Tenant, TenantPayload } from "../types/tenant.types";

export async function getTenants(): Promise<Tenant[]> {
  const response = await client.get<Tenant[]>("/tenants");
  return response.data;
}

export async function createTenant(
  payload: TenantPayload,
): Promise<Tenant> {
  const response = await client.post<Tenant>("/tenants", payload);
  return response.data;
}

export async function updateTenant(
  id: number,
  payload: Partial<TenantPayload>,
): Promise<Tenant> {
  const response = await client.patch<Tenant>(`/tenants/${id}`, payload);
  return response.data;
}

export async function deleteTenant(id: number): Promise<void> {
  await client.delete(`/tenants/${id}`);
}
