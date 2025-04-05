import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constants";
import { Ingredient } from "@prisma/client";

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
