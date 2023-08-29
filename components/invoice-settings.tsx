"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { duplicateInvoice, updateStatus } from "@/lib/actions";
import { Invoice } from "@/lib/types";
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
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { Button } from "./ui/button";
import ConfettiExplosion from 'confetti-explosion-react';


export function InvoiceSettings({ invoice }: { invoice: Invoice }) {
  let [isPending, startTransition] = useTransition();
  const [isExploding, setIsExploding] = React.useState(false);
  const [opacity, setOpacity] = React.useState(100);
  const animationDuration = 3500;

  const soundRef = React.useRef<HTMLAudioElement | null>(null);

  const { toast } = useToast();

  function copyLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/invoice/${invoice.key}`
    );
  }

  function explode() {
    setIsExploding(true);

    setTimeout(() => {
      if (soundRef.current) {
        soundRef.current.play();
      }
    }, 400);

    setTimeout(() => {
      setIsExploding(false);
    }, animationDuration);
  }

  function animateOpacity(timestamp: number, startTime: number, animationDuration: number) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / animationDuration;
    const newOpacity = Math.max(0, 100 - 100 * progress);
    setOpacity(newOpacity);

    if (progress < 1) {
      requestAnimationFrame((timestamp) => animateOpacity(timestamp, startTime, animationDuration));
    }
  }

  React.useEffect(() => {
    if (isExploding) {
      let startTime: any = null;

      requestAnimationFrame((timestamp) => animateOpacity(timestamp, startTime, animationDuration));
    }
  }, [isExploding]);

  return (
    <div className="w-full flex justify-end print:hidden gap-2">
      <audio ref={soundRef} src={'/sound.mp3'} />
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
            explode();
          }}
        >
          <Check className="mr-2 h-4 w-4" />
          Mark Paid
        </Button>
      ) : (
        <>
          <Badge variant="success">Paid</Badge>
          {isExploding && <div style={{
            opacity: opacity / 100,
          }}><ConfettiExplosion /></div>}
        </>
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
