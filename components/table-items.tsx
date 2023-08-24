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
import { InvoiceField } from "./invoice-metadata";
import { TableField } from "./table-field";

export function TableItems({
  items: items,
  invoice_key,
  editable,
}: {
  items: InvoiceItem[];
  invoice_key?: string;
  editable: boolean
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
    <Table className="text-neutral-500 ">
      {editable && (
        <TableCaption>
          <form action={addItem}>
            <Button variant={"ghost"}>+ Item</Button>
          </form>
        </TableCaption>
      )}
      {
        (items.length > 0 || editable) && (
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70%]">Item</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Amt</TableHead>
            </TableRow>
          </TableHeader>
        )
      }
      <TableBody>
        {items.map((item, id) => (
          <TableRow key={id}>
            <TableCell className="flex flex-col">
              {editable ? (
                <>
                  <TableField invoiceKey={invoice_key} item={item} />
                </>
              ) : (
                <><span className="text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </span>
                  <span className="text-sm">{item.description}</span></>
              )
              }
            </TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right flex flex-col">
              <span className="text-neutral-900 dark:text-neutral-100">
                ${item.price}
              </span>
              <span className="text-sm">${item.price / item.quantity}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
}
