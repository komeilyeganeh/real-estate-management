import { client } from "../../../services/api/client";
import type { DashboardStats } from "../types/dashboard.types";

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await client.get<DashboardStats>("/dashboard/stats");
  return response.data;
}