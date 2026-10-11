import { client } from "../../../services/api/client";

import type {
  Unit,
  UnitsResponse,
  UnitPayload,
  UpdateUnitPayload,
} from "../types/unit.types";

export interface GetUnitsParams {
  page: number;
  limit: number;
  search?: string;
}

export async function getUnits(
  params: GetUnitsParams,
): Promise<UnitsResponse> {
  const response = await client.get<UnitsResponse>("/units", {
    params,
  });

  return response.data;
}

export async function createUnit(
  payload: UnitPayload,
): Promise<Unit> {
  const response = await client.post<Unit>("/units", payload);

  return response.data;
}

export async function updateUnit(
  id: number,
  payload: Partial<UpdateUnitPayload>,
): Promise<Unit> {
  const response = await client.patch<Unit>(`/units/${id}`, payload);

  return response.data;
}

export async function deleteUnit(id: number): Promise<void> {
  await client.delete(`/units/${id}`);
}