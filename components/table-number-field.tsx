"use client";

import { InvoiceItem } from "@/lib/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { updateItem, updateTotal } from "@/lib/actions";

export function TableNumberField({
  invoiceKey,
  item,
  field,
}: {
  invoiceKey: string | undefined;
  item: InvoiceItem;
  field: "quantity" | "price";
}) {
  const [value, setValue] = useState(item[field]);

  return (
    <div>
      <Label>{field === "quantity" ? "Quantity" : "Price"}</Label>
      <Input
        type="number"
        id={field}
        placeholder={`Enter ${field === "quantity" ? "quantity" : "price"}`}
        value={value}
        onChange={(e) => {
          field === "quantity" ? setValue(parseInt(e.target.value)) : setValue(parseFloat(e.target.value));
        }}
        className="max-w-[144px]"
        onBlur={() => {
          updateItem(invoiceKey, { ...item, [field === 'quantity' ? 'quantity' : 'price']: value }, item.id);
          updateTotal(invoiceKey);
        }}
      />
    </div>
  );
}
