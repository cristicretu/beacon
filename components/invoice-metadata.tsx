"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { updateField } from "@/lib/actions";
import { Invoice } from "@/lib/types";
import { Textarea } from "./ui/textarea";

export function InvoiceField({
  invoice,
  field,
}: {
  invoice: Invoice;
  field: keyof Invoice;
}) {
  const [name, setName] = useState("");

  return (
    <div>
      <Label>Invoice {field}</Label>
      {field !== "notes" ? (
        <Input
          type="text"
          id="name"
          placeholder={invoice[field] as string}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-[144px]"
          onBlur={() => updateField(invoice.key, name, field)}
        />
      ) : (
        <Textarea
          placeholder={invoice[field] as string}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => updateField(invoice.key, name, field)}
        />
      )}
    </div>
  );
}
