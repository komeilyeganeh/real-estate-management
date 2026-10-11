import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createUnit,
  deleteUnit,
  getUnits,
  updateUnit,
  type GetUnitsParams,
} from "../services/unit.service";

import type {
  UnitPayload,
  UpdateUnitPayload,
} from "../types/unit.types";

export function useUnits(params: GetUnitsParams) {
  return useQuery({
    queryKey: ["units", params],
    queryFn: () => getUnits(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UnitPayload) => createUnit(payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["units"] }),
        queryClient.invalidateQueries({ queryKey: ["properties"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
      ]);
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<UpdateUnitPayload>;
    }) => updateUnit(id, payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["units"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
      ]);
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUnit(id),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["units"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
      ]);
    },
  });
}