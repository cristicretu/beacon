"use client";

import { addSubItem } from "@/lib/actions";
import { Percent, TextCursorInput } from "lucide-react";
import { useTransition } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function SubtotalItem({ invoiceKey }: { invoiceKey: string | undefined }) {
  let [isPending, startTransition] = useTransition();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>+ Item</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              startTransition(() => addSubItem(invoiceKey));
            }}
          >
            <TextCursorInput className="mr-2 h-4 w-4" />
            <span>Normal</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              startTransition(() => addSubItem(invoiceKey, true));
            }}
          >
            <Percent className="mr-2 h-4 w-4" />
            <span>Percent (Tax)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
