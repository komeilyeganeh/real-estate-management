import { z } from "zod";

const dateSchema = z
  .string()
  .min(1, "This field is required.")
  .refine(
    (value) => !Number.isNaN(Date.parse(value)),
    "Enter a valid date.",
  );

const amountSchema = z
  .string()
  .trim()
  .min(1, "This field is required.")
  .refine(
    (value) => /^\d+(\.\d+)?$/.test(value),
    "Enter a valid amount.",
  )
  .refine(
    (value) => Number.isFinite(Number(value)) && Number(value) >= 0,
    "Amount cannot be negative.",
  );

export const leaseSchema = z
  .object({
    unitId: z.number().int().positive("Select a unit."),
    tenantId: z.number().int().positive("Select a tenant."),
    startDate: dateSchema,
    endDate: dateSchema,
    monthlyRent: amountSchema,
    deposit: amountSchema,
  })
  .refine(
    (values) =>
      new Date(values.endDate).getTime() >
      new Date(values.startDate).getTime(),
    {
      message: "End date must be after start date.",
      path: ["endDate"],
    },
  );

export const updateLeaseSchema = z
  .object({
    startDate: dateSchema,
    endDate: dateSchema,
    monthlyRent: amountSchema,
    deposit: amountSchema,
  })
  .refine(
    (values) =>
      new Date(values.endDate).getTime() >
      new Date(values.startDate).getTime(),
    {
      message: "End date must be after start date.",
      path: ["endDate"],
    },
  );

export type LeaseFormValues = z.infer<typeof leaseSchema>;
export type UpdateLeaseFormValues = z.infer<
  typeof updateLeaseSchema
>;