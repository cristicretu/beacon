"use client";

import { InvoiceItem } from "@/lib/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { updateItem } from "@/lib/actions";

export function TableField({ invoiceKey, item }: { invoiceKey: string | undefined, item: InvoiceItem }) {
  const [name, setName] = useState(item.name);
  const [description, setDesc] = useState(item.description);

  return (
    <>
      <Label>Item Name</Label>
      <Input
        type="text"
        id="name"
        placeholder={item.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="max-w-[144px]"
        onBlur={() => { updateItem(invoiceKey, { ...item, name }, item.id) }}
      />
      <Label>Item Description</Label>
      <Input
        type="text"
        id="description"
        placeholder={item.description}
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        className="max-w-[144px]"
        onBlur={() => { updateItem(invoiceKey, { ...item, description }, item.id) }}
      />
    </>
  );
}
