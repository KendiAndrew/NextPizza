import { calcTotalPrice } from "./calc-pizzas-prices";
import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaTypes, PizzaSize, PizzaType } from "../constants/pizza";

export const getPizzaDiteils = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectIngredients: Set<number>
) => {
  const totalPrice = calcTotalPrice(
    type,
    size,
    items,
    ingredients,
    selectIngredients
  );

  const textDetails = `${size} сантиметрів, ${mapPizzaTypes[type]} тісто`;

  return {
    totalPrice,
    textDetails,
  };
};
