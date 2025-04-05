"use client";

import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";
import { ProductImage } from "./product-image";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { getPizzaDiteils } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  loading?: boolean;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectIngredients,
    aviablePizzas,
    currentItemId,
    setSize,
    setType,
    setSelectIngredients,
  } = usePizzaOptions(items);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectIngredients));
    }
  };

  const { totalPrice, textDetails } = getPizzaDiteils(
    type,
    size,
    items,
    ingredients,
    selectIngredients
  );

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center lg:flex-row",
        className
      )}
    >
      <ProductImage src={imageUrl} size={size} />

      <div className="w-[320px] sm:w-[490px] bg-[#F7F6F5] p-4 sm:p-7 lg:rounded-sm">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400 mb-3">{textDetails}</p>

        <div className="flex flex-col gap-2 mt-5 mb-5">
          {" "}
          <GroupVariants
            items={aviablePizzas}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-2 sm:p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 mb-4">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => setSelectIngredients(ingredient.id)}
                active={selectIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={() => {
            handleClickAdd();
          }}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Додати до кошика за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
