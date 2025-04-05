import { createOrder } from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const paymentUrl = await createOrder(data);

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("🚨 Помилка при створенні замовлення:", error);
    return NextResponse.json({ error: "❌ Помилка сервера" }, { status: 500 });
  }
}
