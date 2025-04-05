import { z } from "zod";

export const checkoutFormSchemas = z.object({
  firstName: z
    .string()
    .min(2, { message: `Ім'я повинно мати більше двох символів` }),
  lastName: z
    .string()
    .min(2, { message: `Прізвище повинно мати більше двох символів` }),
  email: z.string().email({ message: "Введіть коректну пошту" }),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Введіть коректний номер телефону",
    }),
  address: z.string().min(5, { message: "Введіть коректну адресу" }),
  comment: z.string().optional(),
});

export type TChectoutForm = z.infer<typeof checkoutFormSchemas>;
