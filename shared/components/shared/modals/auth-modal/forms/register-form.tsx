"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { Button } from "@/shared/components/ui";
import { FormInput } from "../../../form-components";

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("Реєстрація успішна 📝. Підтвердіть свою пошту", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      return toast.error("Не правильна пошта або пароль", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Повне ім'я" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Повторіть пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зареєструватися
        </Button>
      </form>
    </FormProvider>
  );
};
