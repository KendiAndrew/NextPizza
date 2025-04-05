"use client";

import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCartIcon } from "lucide-react";
import { CartDrawer } from "./cart-drawer";
import { cn } from "@/shared/lib/utils";
import { useCartStore } from "@/shared/store/cart";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const cartLength = useCartStore((state) => state.items.length);
  const isLoading = useCartStore((state) => state.loading);

  return (
    <CartDrawer>
      <Button
        loading={isLoading}
        className={cn("group relative", { "w-[105px]": isLoading }, className)}
      >
        <b>{totalAmount} ₴</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCartIcon size={16} className=" relative" strokeWidth={2} />
          <b>{cartLength}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
