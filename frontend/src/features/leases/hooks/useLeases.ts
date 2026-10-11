import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { leaseService } from "../services/lease.service";
import type {
  CreateLeasePayload,
  UpdateLeasePayload,
} from "../types/lease.types";

export const leaseKeys = {
  all: ["leases"] as const,
  detail: (id: number) => ["leases", id] as const,
  tenants: ["tenants"] as const,
  units: ["units"] as const,
  dashboard: ["dashboard"] as const,
};

export function useLeases() {
  return useQuery({
    queryKey: leaseKeys.all,
    queryFn: leaseService.getAll,
  });
}

export function useLease(id: number) {
  return useQuery({
    queryKey: leaseKeys.detail(id),
    queryFn: () => leaseService.getById(id),
    enabled: id > 0,
  });
}

export function useLeaseTenants() {
  return useQuery({
    queryKey: leaseKeys.tenants,
    queryFn: leaseService.getTenants,
  });
}

export function useLeaseUnits() {
  return useQuery({
    queryKey: leaseKeys.units,
    queryFn: leaseService.getUnits,
  });
}

export function useCreateLease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLeasePayload) =>
      leaseService.create(payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: leaseKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboard"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["units"],
        }),
      ]);
    },
  });
}

export function useUpdateLease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateLeasePayload;
    }) => leaseService.update(id, payload),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: leaseKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: leaseKeys.detail(variables.id),
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboard"],
        }),
      ]);
    },
  });
}

export function useTerminateLease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => leaseService.terminate(id),

    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: leaseKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: leaseKeys.detail(id),
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboard"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["units"],
        }),
      ]);
    },
  });
}