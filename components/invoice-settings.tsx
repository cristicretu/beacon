"use client";

import { Button } from "./ui/button";
import {
  Check,
  CircleDashed,
  CopyPlus,
  MoreHorizontal,
  Share,
  Trash,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/lib/types";
import { useTransition } from "react";
import { deleteInvoice, duplicateInvoice, updateStatus } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function InvoiceSettings({ invoice }: { invoice: Invoice }) {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="w-full flex justify-end print:hidden">
      {invoice.draft === true ? (
        <Button
          variant="ghost"
          onClick={() => startTransition(() => updateStatus(invoice.key, "draft"))}
        >
          <Check className="mr-2 h-4 w-4" />
          Publish
        </Button>
      ) : invoice.draft === false && invoice.paid === false ? (
        <Button
          variant="ghost"
          onClick={() => startTransition(() => updateStatus(invoice.key, "paid"))}
        >
          <Check className="mr-2 h-4 w-4" />
          Mark Paid
        </Button>
      ) : (
        <Badge variant="success">Paid</Badge>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{invoice.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => startTransition(() => updateStatus(invoice.key, "draft"))}
            >
              <CircleDashed className="mr-2 h-4 w-4" />
              <span>
                {invoice.draft === false ? "Toggle Draft Mode" : "Publish Draft"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => startTransition(() => updateStatus(invoice.key, "paid"))}
            >
              <Wallet className="mr-2 h-4 w-4" />
              <span>Toggle Paid</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => startTransition(() => duplicateInvoice(invoice.key))}
            >
              <CopyPlus className="mr-2 h-4 w-4" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                startTransition(() => {
                  router.push("/");
                  deleteInvoice(invoice.key);
                })
              }
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
