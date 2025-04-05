"use client";

import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDatails } from "./checkout-item-datails";
import { ArrowRight, Package, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";

const DELIVERY_PRICE = 60;

interface Props {
  className?: string;
  loading: boolean;
  totalAmount: number;
  submiting?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalAmount,
  loading,
  submiting,
}) => {
  return (
    <div className="w-[330px] sm:w-full">
      <WhiteBlock className="p-2 sm:p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Загалом: </span>
          {loading ? (
            <Skeleton className="w-[40%] h-10" />
          ) : (
            <span className="h-10 text-[34px] font-extrabold">
              {totalAmount + DELIVERY_PRICE} ₴
            </span>
          )}
        </div>

        <CheckoutItemDatails
          title={
            <div className="flex items-center">
              <Package size={18} className="mr-2 text-gray-300" />
              Вартість кошику
            </div>
          }
          value={
            loading ? (
              <Skeleton className="h-6 w-16 rounded-[6px]" />
            ) : (
              `${totalAmount} ₴`
            )
          }
        />
        <CheckoutItemDatails
          title={
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-gray-300" />
              Вартість доставки
            </div>
          }
          value={
            loading ? (
              <Skeleton className="h-6 w-12 rounded-[6px]" />
            ) : (
              `${DELIVERY_PRICE} ₴`
            )
          }
        />

        <Button
          loading={submiting}
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Перейти до оплати
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
