"use client"

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteItem, deleteSubItem } from "@/lib/actions";

export function DeleteItem({ invoiceKey, id, field }: { invoiceKey: string | undefined, id: string, field: "item" | "sub_item" }) {
  return (
    <Button variant='destructive' size='icon' onClick={() => {
      field === 'item' ? deleteItem(invoiceKey, id) : deleteSubItem(invoiceKey, id)
    }} className="mt-4">
      <Trash className='h-4 w-4' />
    </Button>
  )
}