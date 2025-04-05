"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/shared/hooks";
import {
  CheackoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/shared/components/shared";
import { checkoutFormSchemas, TChectoutForm } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const [submiting, setSubmiting] = useState(false);
  const { updateItemQuantity, totalAmount, items, removeCartItem, loading } =
    useCart();
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
  const { data: session } = useSession();

  const form = useForm<TChectoutForm>({
    resolver: zodResolver(checkoutFormSchemas),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session, form]);

  const onSubmit = async (data: TChectoutForm) => {
    try {
      setSubmiting(true);

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const { paymentUrl } = await response.json();

      toast.success("Замовлення успішно створено! 📝", {
        icon: "✅",
      });

      if (paymentUrl) {
        location.href = paymentUrl;
      }
    } catch (err) {
      console.log(err);
      setSubmiting(false);
      toast.error("Не вдалося створити замовлення", {
        icon: "❌",
      });
    }
  };

  return (
    <Container className="mt-10 p-1 sm:p-4">
      <Title
        text="Оформлення замовлення"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10 flex-col lg:flex-row">
            <div className="flex flex-col gap-10 flex-1 xl:mb-20 ">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={cn({ "opacity-40 pointer-evens-none": loading })}
              />

              <CheackoutAddressForm
                className={cn({ "opacity-40 pointer-evens-none": loading })}
              />
            </div>
            <CheckoutSidebar
              totalAmount={totalAmount}
              loading={loading}
              submiting={submiting}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
