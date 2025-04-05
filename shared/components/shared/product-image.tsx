import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  src: string;
  size: 20 | 30 | 40;
}

export const ProductImage: React.FC<Props> = ({ size, src, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        {
          "mt-16 mb-16 sm:mt-24 sm:mb-24": size === 20,
          "mt-11 mb-11 sm:mt-20 sm:mb-20": size === 30,
          "mt-4 mb-4 sm:mt-12 sm:mb-12": size === 40,
        },
        className
      )}
    >
      <img
        src={src}
        alt="Pizza img"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]": size === 20,
            "w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]": size === 30,
            "w-[320px] h-[320px] sm:w-[370px] sm:h-[370px]": size === 40,
          }
        )}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[290px] h-[290px] sm:w-[340px] sm:h-[340px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px]" />
    </div>
  );
};
