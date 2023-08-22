import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { InvoiceItem } from "@/lib/types";
import { Button } from "./ui/button";
import { Base } from "deta";
import { revalidatePath } from "next/cache";

export function TableItems({
 items: items,
 invoice_key,
}: {
 items: InvoiceItem[];
 invoice_key?: string;
}) {
 async function addItem() {
  "use server";

  if (!invoice_key) {
   return;
  }

  const db = Base("invoices");

  const invoice = await db.get(invoice_key);

  if (!invoice || !invoice.items) {
   return;
  }

  let items = invoice.items as InvoiceItem[];

  items.push({
   name: "New Item",
   description: "Description",
   quantity: 1,
   price: 0,
  });

  await db.update({ items }, invoice_key);
  revalidatePath("/");
 }

 return (
  <Table className="text-neutral-500 ">
   <TableCaption>
    <form action={addItem}>
     <Button variant={"ghost"}>+ Item</Button>
    </form>
   </TableCaption>
   <TableHeader>
    <TableRow>
     <TableHead className="w-[70%]">Item</TableHead>
     <TableHead>Qty</TableHead>
     <TableHead className="text-right">Amt</TableHead>
    </TableRow>
   </TableHeader>
   <TableBody>
    {items.map((invoice, id) => (
     <TableRow key={id}>
      <TableCell className="flex flex-col">
       <span className="text-neutral-900 dark:text-neutral-100">
        {invoice.name}
       </span>
       <span className="text-sm">{invoice.description}</span>
      </TableCell>
      <TableCell>{invoice.quantity}</TableCell>
      <TableCell className="text-right flex flex-col">
       <span className="text-neutral-900 dark:text-neutral-100">
        ${invoice.price}
       </span>
       <span className="text-sm">${invoice.price / invoice.quantity}</span>
      </TableCell>
     </TableRow>
    ))}
   </TableBody>
  </Table>
 );
}
