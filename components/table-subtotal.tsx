import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Invoice, InvoiceSubItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CurrencySplit } from "./currency-split";
import { Button } from "./ui/button";
import { Base } from "deta";
import { revalidatePath } from "next/cache";
import { TableFieldSubtotal } from "./table-field-subtotal";
import { TableNumberFieldSubtotal } from "./table-number-field-subtotal";
import { DeleteItem } from "./delete-button";

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

  async function addItem() {
    "use server";

    if (!invoice || !invoice.key) {
      return;
    }

    const db = Base("invoices");

    const inv = await db.get(invoice.key);

    if (!inv) {
      return;
    }

    let sub_items = invoice.sub_items as InvoiceSubItem[];

    sub_items.push({
      name: "New Item",
      price: 0,
      id: Math.random().toString(36).substr(2, 9),
    });

    await db.update({ sub_items }, invoice.key);
    revalidatePath("/");
  }

  return (
    <Table className={cn("text-neutral-500 max-w-[400px]")}>
      {editable && (
        <TableCaption>
          <form action={addItem}>
            <Button variant={"ghost"}>+ Item</Button>
          </form>
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
          <TableRow key={id}>
            <TableCell className={cn("py-1.5 relative")}>
              {editable ? (
                <>

                  <TableFieldSubtotal invoiceKey={invoice.key} sub_item={item} />
                  <div className="absolute -top-2 scale-75 transform -left-10">
                    {editable && (
                      <DeleteItem invoiceKey={invoice.key} id={item.id} field="sub_item" />
                    )}
                  </div>
                </>
              ) : (
                <span>{item.name}</span>
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
            className={cn("text-neutral-900 dark:text-neutral-100", "py-1.5")}
          >
            Total
          </TableCell>
          <TableCell
            className={cn(
              "text-right",
              "text-neutral-900 dark:text-neutral-100",
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
