import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItems } from "./table-items";
import { TableSubtotal } from "./table-subtotal";
import { Invoice } from "@/lib/types";
import { InvoiceSettings } from "./invoice-settings";
import { InvoiceGrid } from "./invoice-grid";
import { getContacts } from "@/lib/actions";
import { Suspense } from "react";
import { InvoiceField } from "./invoice-metadata";
import { CurrencySplit } from "./currency-split";
import PrintButton from "./print-button";
import { Skeleton } from "./ui/skeleton";

export async function InvoiceView({
  invoice,
  editable,
  isAuth,
}: {
  invoice: Invoice;
  editable: boolean;
  isAuth: boolean;
}) {
  const contacts = await getContacts();

  return (
    <div className="flex flex-col space-y-16 print:space-y-12 text-neutral-500 relative print:text-xs text-sm sm:text-md">
      {isAuth && (
        <Suspense fallback={<Skeleton className="h-6 w-1/3" />}>
          <InvoiceSettings invoice={invoice} />
        </Suspense>
      )}

      {!isAuth && !editable && (
        <PrintButton />
      )}


      {/* Top part */}
      <div className="flex flex-col space-y-8">
        {/* <Avatar>
          <AvatarImage src="https://github.com/sha" alt="myself" />
          <AvatarFallback>DS</AvatarFallback>
        </Avatar> */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-start md:space-y-0 gap-16 print:gap-8">
          {/* Invoice Details */}
          <div className="flex flex-col space-y-1">
            {editable ? (
              <InvoiceField invoice={invoice} field="name" />
            ) : (
              <h1 className="text-neutral-950 dark:text-neutral-100 print:font-semibold">
                {invoice.name}
              </h1>
            )}
            <p>{invoice.to.name}</p>
            <CurrencySplit currency={invoice.currency} total={invoice.total} />
          </div>

          {/* Issue Date, Due Date, From, To Grid */}
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div>
              <Skeleton className="h-6 w-1/5 mt-4" />
              <Skeleton className="h-6 w-1/4 mt-4" />
            </div>

            <div>
              <Skeleton className="h-6 w-1/5 mt-4" />
              <Skeleton className="h-6 w-1/4 mt-4" />
            </div>

            <div>
              <Skeleton className="h-6 w-1/5 mt-4" />
              <Skeleton className="h-6 w-1/4 mt-4" />
            </div>

            <div>
              <Skeleton className="h-6 w-1/5 mt-4" />
              <Skeleton className="h-6 w-1/4 mt-4" />
            </div>
          </div>}>
            <InvoiceGrid invoice={invoice} editable={editable} contacts={contacts} />
          </Suspense>
        </div>
      </div>

      {/* Invoice Items */}
      <TableItems
        items={invoice.items}
        invoice_key={invoice.key}
        editable={editable}
        currency={invoice.currency}
      />

      {/* Total View */}
      <div className="flex justify-end w-full break-before-avoid-page">
        <TableSubtotal invoice={invoice} editable={editable} />
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
