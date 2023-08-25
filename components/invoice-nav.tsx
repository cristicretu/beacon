"use client"

import { Invoice } from "@/lib/types";
import { SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { convertDate } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Settings } from "./settings";
import { currencySymbol } from "@/lib/currencies";
import { CurrencySplit } from "./currency-split";

export function InvoiceNav({ invoices }: { invoices: Invoice[] }) {
  const paidInvoices = invoices.filter((invoice) => invoice.paid);
  const draftInvoices = invoices.filter((invoice) => invoice.draft && !invoice.paid);
  const publishedInvoices = invoices.filter((invoice) => !invoice.draft && !invoice.paid);

  const pathname = usePathname().split('/')[2]

  return (

    <div className="flex flex-col space-y-4 w-fit">

      {publishedInvoices.length > 0 && <div className="text-neutral-500 font-semibold mb-2">Published</div>}
      {publishedInvoices.map((invoice) => (
        <SheetClose asChild key={invoice.key}>
          <Button variant={invoice.key === pathname ? 'outline' : 'ghost'} className="text-neutral-500 font-normal flex items-center justify-between min-w-[300px] py-8" asChild>
            <a
              href={`/invoice/${invoice.key}`}>
              <span className="flex flex-col items-start space-y-0.5">
                <span className="text-neutral-900 dark:text-neutral-100">{invoice.name}</span>
                <span>{invoice.to.name}</span>
              </span>

              <span className="flex flex-col items-end space-y-0.5">
                <span className="text-neutral-900 dark:text-neutral-100"><CurrencySplit currency={invoice.currency} total={invoice.total} /></span>
                <span>{convertDate(invoice.due_date)}</span>
              </span>
            </a>
          </Button>
        </SheetClose>
      ))}

      {draftInvoices.length > 0 && <div className="text-neutral-500 font-semibold mb-2">Drafts</div>}
      {draftInvoices.map((invoice) => (
        <SheetClose asChild key={invoice.key}>
          <Button variant={invoice.key === pathname ? 'outline' : 'ghost'} className="text-neutral-500 font-normal flex items-center justify-between min-w-[300px] py-8" asChild>
            <a
              href={`/invoice/${invoice.key}`}>
              <span className="flex flex-col items-start space-y-0.5">
                <span className="text-neutral-900 dark:text-neutral-100">{invoice.name}</span>
                <span>{invoice.to.name}</span>
              </span>

              <span className="flex flex-col items-end space-y-0.5">
                <span className="text-neutral-900 dark:text-neutral-100">${invoice.total}</span>
                <span>{convertDate(invoice.due_date)}</span>
              </span>
            </a>
          </Button>
        </SheetClose>
      ))}

      {paidInvoices.length > 0 && <div className="text-neutral-500 font-semibold mb-2">Paid</div>}
      {paidInvoices.map((invoice) => (
        <SheetClose asChild key={invoice.key}>
          <Button variant={invoice.key === pathname ? 'outline' : 'ghost'} className="text-neutral-500 font-normal flex items-center justify-between min-w-[300px] py-8" asChild>
            <Link
              href={`/invoice/[slug]`}
              as={`/invoice/${invoice.key}`}
            >
              <span className="flex flex-col items-start space-y-0.5">
                <span className="text-neutral-900 dark:text-neutral-100">{invoice.name}</span>
                <span>{invoice.to.name}</span>
              </span>

              <span className="flex flex-col items-end space-y-0.5">
                <span className="text-neutral-900 dark:text-neutral-100">${invoice.total}</span>
                <span>{convertDate(invoice.due_date)}</span>
              </span>
            </Link>
          </Button>
        </SheetClose>
      ))}

      <div className="px-4 flex items-center justify-between">
        <Suspense>
          <Settings />
        </Suspense>
      </div>

    </div>
  )
}