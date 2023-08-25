"use client"
import { InvoiceSubItem } from "@/lib/types";
import { Input } from "./ui/input";
import { useState } from "react";
import { updateSubItem } from "@/lib/actions";

export function TableFieldSubtotal({ invoiceKey, sub_item }: { invoiceKey: string | undefined, sub_item: InvoiceSubItem }) {
  const [name, setName] = useState(sub_item.name);
  return (
    <Input
      type="text"
      id="name"
      placeholder={sub_item.name}
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="max-w-[144px]"
      onBlur={() => {
        updateSubItem(invoiceKey, { ...sub_item, name }, sub_item.id);
      }}
    />
  )
}