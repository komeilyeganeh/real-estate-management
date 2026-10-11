export interface Property {
  id: number;
  name: string;
  address: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertiesResponse {
  data: Property[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PropertyPayload {
  name: string;
  address: string;
  description?: string;
}