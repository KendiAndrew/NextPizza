"use client";

import React, { useState } from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFilterGroup } from "./checkbox-filters-group";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={cn("lg:relative", className)}>
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          "w-10 flex cursor-pointer pt-[12px] relative transition-transform duration-300 z-[6] lg:static lg:hidden ",
          open ? "translate-x-[240px] " : "translate-x-[0px] "
        )}
      >
        <SlidersHorizontal />
      </div>

      <div
        className={cn(
          "bg-white transition-transform duration-300 relative bottom-[30px] lg:bottom-0 lg:translate-x-[0px]",
          open
            ? "translate-x-[0px] z-[5]"
            : "translate-x-[-350px] pointer-events-none",
          className
        )}
      >
        <div>
          <Title text="Фільтрація" size="sm" className="mb-5 font-bold" />
          <CheckboxFilterGroup
            name="pizzaType"
            className="mb-5"
            title="Вид тіста"
            onClickCheckbox={filters.setTypes}
            items={[
              { text: "Тонке", value: "1" },
              { text: "Традиційне", value: "2" },
            ]}
            selected={filters.types}
          />

          <CheckboxFilterGroup
            title="Розмір"
            name="sizes"
            className="mt-5"
            items={[
              { text: "20 cм", value: "20" },
              { text: "30 cм", value: "30" },
              { text: "40 cм", value: "40" },
            ]}
            onClickCheckbox={filters.setSize}
            selected={filters.sizes}
          />

          <div className="mt-5 border-y border-y-neutral-100 py-6">
            <p className="font-bold mb-3"> Ціна від і до:</p>
            <div className="flex gap-3 mb-5 px-4">
              <Input
                type="number"
                placeholder="0"
                min={0}
                max={1000}
                value={String(filters.prices.priceFrom)}
                onChange={(e) =>
                  filters.setPrices("priceFrom", Number(e.target.value))
                }
              />
              <Input
                type="number"
                min={100}
                max={1000}
                placeholder="1000"
                value={String(filters.prices.priceTo)}
                onChange={(e) =>
                  filters.setPrices("priceTo", Number(e.target.value))
                }
              />
            </div>
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              value={[
                filters.prices.priceFrom || 0,
                filters.prices.priceTo || 1000,
              ]}
              onValueChange={updatePrices}
            />
          </div>

          <CheckboxFilterGroup
            title="Ігрідієнти"
            name="Ingredients"
            className="mt-5"
            limit={6}
            defaultItems={items.slice(0, 6)}
            items={items}
            loading={loading}
            onClickCheckbox={filters.setIngredients}
            selected={filters.selectedIngredients}
          />
        </div>
      </div>
    </div>
  );
};
