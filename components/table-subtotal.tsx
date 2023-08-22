import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const subtotals = [
 {
  text: "Subtotal",
  amt: 25.0,
 },
 {
  text: "Tax @ 19%",
  amt: 50.0,
 },
 {
  text: "Total",
  amt: 75.0,
  final: true,
 },
];

export function TableSubtotal() {
 return (
  <Table className={cn("text-neutral-500 max-w-[256px]")}>
   <TableBody>
    {subtotals.map((item, id) => (
     <TableRow key={id}>
      <TableCell
       className={cn(
        item.final && "text-neutral-900 dark:text-neutral-100",
        "py-1.5"
       )}
      >
       {item.text}
      </TableCell>
      <TableCell
       className={cn(
        "text-right",
        item.final && "text-neutral-900 dark:text-neutral-100",
        "py-1.5 pl-32"
       )}
      >
       ${item.amt}
      </TableCell>
     </TableRow>
    ))}
   </TableBody>
  </Table>
 );
}
