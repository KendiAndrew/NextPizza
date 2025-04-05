import qs from "qs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Filter } from "./use-filters";

export const useQueryFilters = (filters: Filter) => {
  const router = useRouter();

  useEffect(() => {
    const queryString = qs.stringify(
      {
        ...filters.prices,
        pizzaType: Array.from(filters.types),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      },
      {
        arrayFormat: "comma",
      }
    );

    router.push(`?${queryString}`, { scroll: false });
  }, [filters]);
};
