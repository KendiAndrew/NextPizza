import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { getCartItemsDetails } from "@/shared/lib";
import { CheckoutItemSkeleton } from "../checkout-item-ckeleton";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  loading,
  onClickCountButton,
  removeCartItem,
}) => {
  return (
    <WhiteBlock title="1. Кошик" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} className="h-20" />
            ))
          : items.map((item) => (
              <div key={item.id}>
                <CheckoutItem
                  details={getCartItemsDetails(
                    item.type as PizzaType,
                    item.pizzaSize as PizzaSize,
                    item.ingredients
                  )}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  imageUrl={item.imageUrl}
                  id={item.id}
                />
              </div>
            ))}
      </div>
    </WhiteBlock>
  );
};
