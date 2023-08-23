import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItems } from "./table-items";
import { TableSubtotal } from "./table-subtotal";
import { Invoice } from "@/lib/types";
import { InvoiceSettings } from "./invoice-settings";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InvoiceGrid } from "./invoice-grid";
import { getContacts } from "@/lib/actions";
import { Suspense } from "react";
import { InvoiceField } from "./invoice-metadata";

export async function InvoiceView({
  invoice,
  editable,
}: {
  invoice: Invoice;
  editable: boolean;
}) {
  const contacts = await getContacts();

  return (
    <div className="flex flex-col space-y-16 text-neutral-500 relative">
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceSettings invoice={invoice} />
      </Suspense>

      {/* Top part */}
      <div className="flex flex-col space-y-8">
        <Avatar>
          <AvatarImage src="https://github.com/sha" alt="myself" />
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>

        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start md:space-y-0 gap-16">
          {/* Invoice Details */}
          <div className="flex flex-col">
            {editable ? (
              <InvoiceField invoice={invoice} field="name" />
            ) : (
              <h1 className="text-neutral-950 dark:text-neutral-100">
                {invoice.name}
              </h1>
            )}
            <p>{invoice.to.name}</p>
            <span>${invoice.total}</span>
          </div>

          {/* Issue Date, Due Date, From, To Grid */}
          <Suspense fallback={<div>Loading...</div>}>
            <InvoiceGrid invoice={invoice} editable={editable} contacts={contacts} />
          </Suspense>
        </div>
      </div>

      {/* Invoice Items */}
      <TableItems items={invoice.items} invoice_key={invoice.key} />

      {/* Total View */}
      <div className="flex justify-end w-full">
        <TableSubtotal />
      </div>

      {/* Note */}
      {editable ? (
        <InvoiceField invoice={invoice} field="notes" />
      ) : invoice.notes ? (
        <p>{invoice.notes}</p>
      ) : null}
    </div>
  );
}
