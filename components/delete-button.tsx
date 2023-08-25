"use client"

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteItem } from "@/lib/actions";

export function DeleteItem({ invoiceKey, id }: { invoiceKey: string | undefined, id: string }) {
  return (
    <Button variant='destructive' size='icon' onClick={() => deleteItem(invoiceKey, id)} className="mt-4">
      <Trash className='h-4 w-4' />
    </Button>
  )
}