import { client } from "../../../services/api/client";
import type {
  PropertiesResponse,
  Property,
  PropertyPayload,
} from "../types/property.types";

export interface GetPropertiesParams {
  page: number;
  limit: number;
  search?: string;
}

export async function getProperties(
  params: GetPropertiesParams,
): Promise<PropertiesResponse> {
  const response = await client.get<PropertiesResponse>("/properties", {
    params,
  });

  return response.data;
}

export async function createProperty(
  payload: PropertyPayload,
): Promise<Property> {
  const response = await client.post<Property>("/properties", payload);
  return response.data;
}

export async function updateProperty(
  id: number,
  payload: Partial<PropertyPayload>,
): Promise<Property> {
  const response = await client.patch<Property>(
    `/properties/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteProperty(id: number): Promise<void> {
  await client.delete(`/properties/${id}`);
}