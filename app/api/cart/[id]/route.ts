import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token is nof found" });
    }

    const updatedItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!updatedItem) {
      return NextResponse.json({ error: "Cart item is not found" });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token is not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: id },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item is not found" });
    }

    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });

    const updateUSerCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUSerCart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не вдалося видалити кошик" },
      { status: 500 }
    );
  }
}
