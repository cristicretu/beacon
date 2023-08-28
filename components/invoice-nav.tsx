"use client"

import { Invoice } from "@/lib/types";
import { SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { convertDate } from "@/lib/utils";
import Link from "next/link";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { Settings } from "./settings";
import { currencySymbol } from "@/lib/currencies";
import { CurrencySplit } from "./currency-split";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "./ui/input";

export function InvoiceNav({ invoices }: { invoices: Invoice[] }) {
  const [name, setName] = useState('')
  const filteredInvoices = invoices.filter((invoice) => {
    const invoiceName = invoice.name.toLowerCase();
    const searchName = name.toLowerCase();
    return invoiceName.includes(searchName);
  });

  const paidInvoices = filteredInvoices.filter((invoice) => invoice.paid);
  const draftInvoices = filteredInvoices.filter((invoice) => invoice.draft && !invoice.paid);
  const publishedInvoices = filteredInvoices.filter((invoice) => !invoice.draft && !invoice.paid);

  const pathname = usePathname().split('/')[2]



  return (

    <div className="flex flex-col space-y-4 w-full overflow-y-auto">
      <div className="px-2 mt-4">
        <Input
          placeholder="Search..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {publishedInvoices.length > 0 && <div className="text-neutral-500 font-semibold mb-2">Published</div>}
      <ScrollArea className="max-h-[100px] sm:max-h-[200px]  overflow-y-auto">
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
      </ScrollArea>

      {draftInvoices.length > 0 && <div className="text-neutral-500 font-semibold mb-2">Drafts</div>}
      <ScrollArea className="max-h-[100px] sm:max-h-[200px] overflow-y-auto">
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
                  <span className="text-neutral-900 dark:text-neutral-100"><CurrencySplit currency={invoice.currency} total={invoice.total} /></span>
                  <span>{convertDate(invoice.due_date)}</span>
                </span>
              </a>
            </Button>
          </SheetClose>
        ))}
      </ScrollArea>

      {paidInvoices.length > 0 && <div className="text-neutral-500 font-semibold mb-2">Paid</div>}
      <ScrollArea className="max-h-[100px] sm:max-h-[200px] overflow-y-auto">
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
                  <span className="text-neutral-900 dark:text-neutral-100"><CurrencySplit currency={invoice.currency} total={invoice.total} /></span>
                  <span>{convertDate(invoice.due_date)}</span>
                </span>
              </Link>
            </Button>
          </SheetClose>
        ))}
      </ScrollArea>

      <div className="px-4 flex items-center justify-between w-full">
        <Suspense>
          <Settings />
        </Suspense>
      </div>

    </div>
  )
}