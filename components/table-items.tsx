import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Currency, InvoiceItem } from "@/lib/types";
import { Button } from "./ui/button";
import { Base } from "deta";
import { revalidatePath } from "next/cache";
import { TableField } from "./table-field";
import { TableNumberField } from "./table-number-field";
import { cn } from "@/lib/utils";
import { CurrencySplit } from "./currency-split";
import { DeleteItem } from "./delete-button";

export function TableItems({
  items: items,
  invoice_key,
  editable,
  currency,
}: {
  items: InvoiceItem[];
  invoice_key?: string;
  editable: boolean;
  currency: Currency;
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
      id: Math.random().toString(36).substr(2, 9),
    });

    await db.update({ items }, invoice_key);
    revalidatePath("/");
  }

  return (
    <Table className="text-neutral-500 print:text-xs">
      {editable && (
        <TableCaption>
          <form action={addItem}>
            <Button variant={"ghost"}>+ Item</Button>
          </form>
        </TableCaption>
      )}
      {(items.length > 0 || editable) && (
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70%]">Item</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead className="text-right">Amt</TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {items.map((item, id) => (
          <TableRow key={id} className="">
            <TableCell className="flex flex-col">
              {editable ? (
                <>
                  <TableField invoiceKey={invoice_key} item={item} />
                  <DeleteItem invoiceKey={invoice_key} id={item.id} field="item" />
                </>
              ) : (
                <>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    {item.name}
                  </span>
                  <span className="text-sm print:text-[11px]">{item.description}</span>
                </>
              )}
            </TableCell>
            <TableCell>
              {editable ? (
                <TableNumberField
                  invoiceKey={invoice_key}
                  item={item}
                  field="quantity"
                />
              ) : (
                <span>{item.quantity}</span>
              )}
              <span className="invisible">x</span>
            </TableCell>
            <TableCell className={cn("text-right", !editable && "flex flex-col")}>
              {editable ? (
                <TableNumberField invoiceKey={invoice_key} item={item} field="price" />
              ) : (
                <span className="text-neutral-900 dark:text-neutral-100 print:font-semibold">
                  <CurrencySplit
                    currency={currency}
                    total={Math.round((item.price * item.quantity) * 100) / 100}
                    className="flex-row-reverse"
                  />
                </span>
              )}
              <span className="text-sm print:text-[11px]">
                <CurrencySplit
                  currency={currency}
                  total={item.price}
                  className="flex-row-reverse"
                />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
