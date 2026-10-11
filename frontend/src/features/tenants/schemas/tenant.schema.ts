import { z } from "zod";

export const tenantSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(100, "First name must not exceed 100 characters."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(100, "Last name must not exceed 100 characters."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email must not exceed 254 characters."),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .max(30, "Phone number must not exceed 30 characters."),
});

export type TenantFormValues = z.infer<typeof tenantSchema>;
