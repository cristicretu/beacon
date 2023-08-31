"use client";

import { InvoiceSubItem } from "@/lib/types";
import { Input } from "./ui/input";
import { useState } from "react";
import { updateSubItem, updateTotal } from "@/lib/actions";

export function TableNumberFieldSubtotal({
  invoiceKey,
  sub_item,
}: {
  invoiceKey: string | undefined;
  sub_item: InvoiceSubItem;
}) {
  const [value, setValue] = useState(
    sub_item.relative ? sub_item.relative : sub_item.price
  );

  return (
    <div>
      {sub_item.relative ? (
        <div className="flex items-center space-x-1">
          <Input
            type="number"
            id="relative"
            placeholder={sub_item.relative.toString()}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="max-w-[80px]"
            onBlur={() => {
              updateSubItem(invoiceKey, { ...sub_item, relative: value }, sub_item.id);
              updateTotal(invoiceKey);
            }}
          />
          <span>%</span>
        </div>
      ) : (
        <Input
          type="number"
          id={"price"}
          placeholder={"Price"}
          value={value}
          onChange={(e) => {
            setValue(parseFloat(e.target.value));
          }}
          className="max-w-[250px]"
          onBlur={() => {
            updateSubItem(invoiceKey, { ...sub_item, price: value }, sub_item.id);
            updateTotal(invoiceKey);
          }}
        />
      )}
    </div>
  );
}
