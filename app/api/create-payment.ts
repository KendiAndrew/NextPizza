import crypto from "crypto";

const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_API_KEY!;
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_API_KEY!;
const LIQPAY_API_URL = "https://www.liqpay.ua/api/3/checkout";

interface PaymentData {
  orderId: number;
  totalAmount: number;
  comment?: string | null;
}

export async function createPayment({
  orderId,
  totalAmount,
  comment,
}: PaymentData) {
  const paymentData = {
    version: "3",
    public_key: LIQPAY_PUBLIC_KEY,
    action: "pay",
    amount: (totalAmount + 60).toFixed(2),
    currency: "UAH",
    description: comment || `Оплата за замовлення №${orderId}`,
    order_id: orderId,
    result_url: process.env.NEXT_PUBLIC_SITE_URL,
  };

  const dataEncoded = Buffer.from(JSON.stringify(paymentData)).toString(
    "base64"
  );

  const signString = LIQPAY_PRIVATE_KEY + dataEncoded + LIQPAY_PRIVATE_KEY;
  const signature = crypto
    .createHash("sha1")
    .update(signString)
    .digest("base64");

  const paymentUrl = `${LIQPAY_API_URL}?data=${encodeURIComponent(
    dataEncoded
  )}&signature=${encodeURIComponent(signature)}`;

  return paymentUrl;
}
