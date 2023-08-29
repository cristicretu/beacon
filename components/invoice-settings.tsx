"use client";

import { Button } from "./ui/button";
import {
  Check,
  CircleDashed,
  CopyPlus,
  MoreHorizontal,
  Printer,
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
import { useToast } from "@/components/ui/use-toast";
import { AlertDialogDelete } from "./AlertDialogDelete";

export function InvoiceSettings({ invoice }: { invoice: Invoice }) {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  function copyLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/invoice/${invoice.key}`
    );
  }

  return (
    <div className="w-full flex justify-end print:hidden gap-2">
      {invoice.draft === true ? (
        <Button
          variant="ghost"
          onClick={() => {
            startTransition(() => updateStatus(invoice.key, "draft"));
            toast({
              description: "Your invoice has been published.",
            });
          }}
        >
          <Check className="mr-2 h-4 w-4" />
          Publish
        </Button>
      ) : invoice.draft === false && invoice.paid === false ? (
        <Button
          variant="ghost"
          onClick={() => {
            startTransition(() => updateStatus(invoice.key, "paid"));
            toast({
              description: "Hooray! Your invoice is paid!",
            });
          }}
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
              onClick={() => {
                startTransition(() => updateStatus(invoice.key, "draft"));
              }}
            >
              <CircleDashed className="mr-2 h-4 w-4" />
              <span>
                {invoice.draft === false ? "Toggle Edit Mode" : "Publish Invoice"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (invoice.paid === false) {
                  toast({
                    description: "Hooray! Your invoice is paid!",
                  });
                }
                startTransition(() => updateStatus(invoice.key, "paid"));
              }}
            >
              <Wallet className="mr-2 h-4 w-4" />
              <span>Toggle Paid</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => duplicateInvoice(invoice.key));
                toast({
                  description: `${invoice.name} has been duplicated.`,
                });
              }}
            >
              <CopyPlus className="mr-2 h-4 w-4" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => copyLink());
                toast({
                  description: "Link copied to clipboard.",
                });
              }}
            >
              <Share className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startTransition(() => window.print())}>
              <Printer className="mr-2 h-4 w-4" />
              <span>Print</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <AlertDialogDelete name={invoice.name} invoiceKey={invoice.key!}>
              <Button variant="ghost" className="w-full h-6 py-4 flex flex-row justify-start px-2">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </Button>
            </AlertDialogDelete>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
