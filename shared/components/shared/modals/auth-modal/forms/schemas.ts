import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Введіть коректний пароль" });

export const formLoginSchemas = z.object({
  email: z.string().email({ message: "Введіть коректну пошту" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchemas
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Введіть ім'я та прізвище" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchemas>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
