import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface Filters extends PriceProps {
  pizzaType: string;
  sizes: string;
  ingredients: string;
}

export interface Filter {
  sizes: Set<string>;
  types: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

export interface ReturnProps extends Filter {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setTypes: (value: string) => void;
  setSize: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof Filters,
    string
  >;

  // Фільтр інгредієнтів
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(
      searchParams.get("ingredients")
        ? searchParams.get("ingredients")?.split(",")
        : []
    )
  );

  //Фільтр розмірів
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  //Фільтр типу
  const [types, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaType")?.split(","))
  );

  //Фільтр вартості
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const setInputPrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      sizes,
      types,
      prices,
      selectedIngredients,
      setPrices: setInputPrice,
      setTypes: togglePizzaTypes,
      setSize: toggleSizes,
      setIngredients: toggleIngredients,
    }),
    [sizes, types, selectedIngredients, prices]
  );
};
