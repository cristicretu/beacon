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
 invoices,
 key,
}: {
 invoices: InvoiceItem[];
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
    {invoices.map((invoice, id) => (
     <TableRow key={id}>
      <TableCell className="flex flex-col">
       <span className="text-neutral-900 dark:text-neutral-100">
        {invoice.name}
       </span>
       <span className="text-sm">{invoice.description}</span>
      </TableCell>
      <TableCell>{invoice.qty}</TableCell>
      <TableCell className="text-right flex flex-col">
       <span className="text-neutral-900 dark:text-neutral-100">
        ${invoice.amt}
       </span>
       <span className="text-sm">${invoice.amt / invoice.qty}</span>
      </TableCell>
     </TableRow>
    ))}
   </TableBody>
  </Table>
 );
}
