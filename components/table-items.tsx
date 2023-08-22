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

export function TableItems({
 items: items,
 key,
}: {
 items: InvoiceItem[];
 key?: string;
}) {
 return (
  <Table className="text-neutral-500 ">
   <TableCaption>+ Item</TableCaption>
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
