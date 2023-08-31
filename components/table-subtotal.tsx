import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CurrencySplit } from "./currency-split";
import { TableFieldSubtotal } from "./table-field-subtotal";
import { TableNumberFieldSubtotal } from "./table-number-field-subtotal";
import { DeleteItem } from "./delete-button";
import SubtotalItem from "./subtotal-item";

export function TableSubtotal({
  invoice,
  editable,
}: {
  invoice: Invoice;
  editable: boolean;
}) {
  const subtotals = invoice.sub_items;

  const subtotal = invoice.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <Table className={cn("text-neutral-500 max-w-[400px]", "print:text-xs")}>
      {editable && (
        <TableCaption>
          <SubtotalItem invoiceKey={invoice.key} />
        </TableCaption>
      )}
      <TableBody>
        <TableRow key={invoice.total}>
          <TableCell className={cn("py-1.5")}>Subtotal</TableCell>
          <TableCell className={cn("text-right", "py-1.5 pl-32")}>
            <CurrencySplit
              currency={invoice.currency}
              total={subtotal}
              className="flex-row-reverse"
            />
          </TableCell>
        </TableRow>
        {subtotals.map((item, id) => (
          <TableRow key={id} className="group">
            <TableCell className={cn("py-1.5 relative")}>
              {editable ? (
                <>
                  <TableFieldSubtotal invoiceKey={invoice.key} sub_item={item} />
                  <div className="absolute -top-2 scale-75 transform left-32 lg:invisible lg:group-hover:visible">
                    {editable && (
                      <DeleteItem invoiceKey={invoice.key} id={item.id} field="sub_item" />
                    )}
                  </div>
                </>
              ) : (
                <>
                  {item.relative ? <span>{item.name}{"  @ "}{item.relative}%</span> : <span>{item.name}</span>}
                </>
              )}
            </TableCell>
            <TableCell className={cn("text-right", "py-1.5 pl-32")}>
              {editable ? (
                <TableNumberFieldSubtotal invoiceKey={invoice.key} sub_item={item} />
              ) : (
                <CurrencySplit
                  currency={invoice.currency}
                  total={item.price}
                  className="flex-row-reverse"
                />
              )}
            </TableCell>
          </TableRow>
        ))}
        <TableRow key={invoice.total}>
          <TableCell
            className={cn(
              "text-neutral-900 dark:text-neutral-100 print:font-semibold",
              "py-1.5"
            )}
          >
            Total
          </TableCell>
          <TableCell
            className={cn(
              "text-right",
              "text-neutral-900 dark:text-neutral-100 print:font-semibold",
              "py-1.5 pl-32"
            )}
          >
            <CurrencySplit
              currency={invoice.currency}
              total={invoice.total}
              className="flex-row-reverse"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
