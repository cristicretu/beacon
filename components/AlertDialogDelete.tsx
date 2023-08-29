"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast";
import { deleteInvoice } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function AlertDialogDelete({ children, name, invoiceKey }: { children: React.ReactNode, name: string, invoiceKey: string }) {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            invoice. No seeing it again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            toast({
              description: `${name} has been deleted.`,
            });
            startTransition(() => {
              router.push("/");
              deleteInvoice(invoiceKey);
            });
          }}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
