import { z } from "zod";

export const propertySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "نام ملک الزامی است.")
    .max(100, "نام ملک نباید بیشتر از ۱۰۰ کاراکتر باشد."),

  address: z
    .string()
    .trim()
    .min(1, "آدرس ملک الزامی است.")
    .max(250, "آدرس نباید بیشتر از ۲۵۰ کاراکتر باشد."),

  description: z
    .string()
    .max(1000, "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد."),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;