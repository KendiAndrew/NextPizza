import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  className?: string;
  onSubmit?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col rounded-[10px] items-center lg:flex-row",
        className
      )}
    >
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="sm:relative sm:left-2 sm:top-2 transition-all duration-300 w-[310px] h-[310px] sm:w-[350px] sm:h-[350px]"
        />
      </div>

      <div className=" flex flex-col w-full h-full justify-between sm:w-[490px] bg-[#F7F6F5] p-5 rounded-sm sm:p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Додати до корзини за {price} ₴
        </Button>
      </div>
    </div>
  );
};
