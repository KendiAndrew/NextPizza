import React from "react";

interface EmailTemplateProps {
  order_id: number;
  totalAmount: number;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  order_id,
  totalAmount,
}) => (
  <div>
    <h1>Замовлення №{order_id}</h1>

    <p>
      Оплата замовлення на суму <b>{totalAmount} грн.</b>
    </p>
  </div>
);
