"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form-components";

interface Props {
  className?: string;
}

export const CheackoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Адреса" />

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Коментар до замовлення"
        />
      </div>
    </WhiteBlock>
  );
};
