import { PizzaSize, PizzaType } from "../constants/pizza";
import React, { useEffect, useState } from "react";
import { Variant } from "../components/shared/group-variants";
import { useSet } from "react-use";
import { getAviablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectIngredients: Set<number>;
  aviablePizzas: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  setSelectIngredients: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectIngredients, { toggle: setSelectIngredients }] = useSet(
    new Set<number>([])
  );

  const aviablePizzas = getAviablePizzaSizes(type, items);

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  useEffect(() => {
    const iaDisabledSize = aviablePizzas?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const avaibleSize = aviablePizzas?.find((item) => !item.disabled);
    if (avaibleSize && !iaDisabledSize) {
      setSize(Number(avaibleSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    currentItemId,
    aviablePizzas,
    selectIngredients,
    setSelectIngredients,
  };
};
