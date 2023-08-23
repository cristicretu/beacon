import { InvoiceView } from "@/components/invoice-view";
import { Button } from "@/components/ui/button";
import { getInvoices } from "@/lib/actions";
import { convertDate } from "@/lib/utils";

export default async function Home() {
  const invoices = await getInvoices();

  return (
    <main className="mx-auto max-w-4xl w-[676px]">
      <div className="flex flex-col space-y-4 w-fit">
        {invoices.map((invoice) => (
          <Button key={invoice.key} variant="ghost" className="text-neutral-500 font-normal flex items-center justify-between min-w-[300px] py-8">
            <span className="flex flex-col items-start space-y-0.5">
              <span className="text-neutral-900 dark:text-neutral-100">Invoice {invoice.number}</span>
              <span>{invoice.to.name}</span>
            </span>

            <span className="flex flex-col items-end space-y-0.5">
              <span className="text-neutral-900 dark:text-neutral-100">${invoice.total}</span>
              <span>{convertDate(invoice.due_date)}</span>
            </span>
          </Button>
        ))}
      </div>
      <InvoiceView invoice={invoices[0]} />
    </main>
  );
}
