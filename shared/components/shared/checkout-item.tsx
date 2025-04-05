import React from "react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { cn } from "@/shared/lib/utils";
import * as CartItemDetails from "./cart-item-details";
import { X } from "lucide-react";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  onClickCountButton,
  onClickRemove,
  className,
  disabled,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between flex-wrap gap-4 sm:flex-nowrap ",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
      <div className="w-full flex items-center sm:gap-4">
        <div className=" flex items-center gap-5 flex-1">
          <CartItemDetails.Image src={imageUrl} />
          <CartItemDetails.Info
            name={name}
            details={details}
            className="lg:w-[200px] lg:mr-20"
          />
        </div>

        <CartItemDetails.Price
          value={price}
          className="lg:w-[50px] lg:mx-5 xl:mx-10"
        />
      </div>

      <div className="flex items-center gap-20 lg:gap-5 ml-20 lg:ml-0">
        <CartItemDetails.CountButton
          onClick={onClickCountButton}
          value={quantity}
        />
        <button type="button" onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
