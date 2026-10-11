import { z } from "zod";

export const unitSchema = z.object({
  unitNumber: z
    .string()
    .trim()
    .min(1, "Unit number is required.")
    .max(50, "Unit number must not exceed 50 characters."),

  floor: z
    .number({ error: "Floor is required." })
    .int("Floor must be a whole number.")
    .min(-10, "Floor must be at least -10.")
    .max(300, "Floor must not exceed 300."),

  area: z
    .number({ error: "Area is required." })
    .positive("Area must be greater than zero.")
    .max(1000000, "Area is too large."),

  bedrooms: z
    .number({ error: "Number of bedrooms is required." })
    .int("Bedrooms must be a whole number.")
    .min(0, "Bedrooms cannot be negative.")
    .max(100, "Bedrooms must not exceed 100."),

  monthlyRent: z
    .number({ error: "Monthly rent is required." })
    .positive("Monthly rent must be greater than zero.")
    .max(1000000000, "Monthly rent is too large."),

  propertyId: z
    .number({ error: "Please select a property." })
    .int("Please select a valid property.")
    .positive("Please select a property."),
});

export type UnitFormValues = z.infer<typeof unitSchema>;