"use server";

import { TChectoutForm } from "@/shared/constants";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment } from "./api/create-payment";
import { sendEmail } from "@/shared/lib";
import { EmailTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";

export async function createOrder(data: TChectoutForm) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("❌ Кошик не знайдено.");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: { include: { product: true } },
          },
        },
      },
      where: { cartToken },
    });

    if (!userCart) throw new Error("❌ Кошик не знайдено в базі.");
    if (userCart.totalAmount === 0) throw new Error("❌ Кошик порожній.");

    // 📌 1. Створюємо замовлення
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    console.log("✅ Замовлення створено, ID:", order.id);

    // 📌 2. Очищуємо кошик
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id },
    });

    // 📌 3. Створюємо оплату через LiqPay
    const paymentUrl = await createPayment({
      orderId: order.id,
      totalAmount: order.totalAmount,
      comment: order.comment,
    });

    await sendEmail(
      data.email,
      "Next Pizza | Оплата замовлення",
      EmailTemplate({
        order_id: order.id,
        totalAmount: order.totalAmount,
      })
    );

    return paymentUrl; // Повертаємо посилання на оплату
  } catch (err) {
    console.error("🚨 [CreateOrder] Помилка сервера:", err);
    throw new Error("❌ Помилка при створенні замовлення.");
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Користувач не знайдений");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("Error [UPDATE_USER]", error);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Пошта не підтверджена");
      }

      throw new Error("Користувач вже існує");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza / 📝 Підтвердження реєстрації",
      VerificationUserTemplate({
        code,
      })
    );
  } catch (err) {
    console.log("Error [CREATE_USER]", err);
    throw err;
  }
}
