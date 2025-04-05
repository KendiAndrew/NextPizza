"use client";

import React, { useState } from "react";
import { FilterCheckbox, FilterCheckboxProp } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterCheckboxProp;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  seacrhInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValues?: string[];
  selected: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  seacrhInputPlaceholder = "Пошук...",
  onClickCheckbox,
  loading,
  defaultValues,
  className,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [sesrchValue, setSearchValue] = useState("");

  const onChangeSeacrhInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="mb-4 h-6 rounded-[8px] w-[100%]" />
          ))}{" "}
        <Skeleton className="w-28 mb-4 h-6 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((items) =>
        items.text.toLocaleLowerCase().includes(sesrchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSeacrhInput}
            placeholder={seacrhInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selected?.has(item.value)}
            key={index}
            value={item.value}
            text={item.text}
            endAdormend={item.endAdormend}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Закрити" : "+ Показати все"}
          </button>
        </div>
      )}
    </div>
  );
};
