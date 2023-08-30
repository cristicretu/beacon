import { InvoiceView } from "@/components/invoice-view";
import { getInvoice } from "@/lib/actions";
import { cn } from "@/lib/utils";

export default async function InvoicePage({
  params,
}: {
  params: { slug: string };
}) {
  const invoice = await getInvoice(params.slug);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <main
      className={cn(
        "bg-neutral-50 dark:bg-neutral-900",
        "print:!mx-auto print:!px-12 print:!py-8",
        "-mx-4 px-6 py-8 rounded-sm  max-w-3xl",
        "md:max-w-4xl md:px-16 lg:px-24 md:py-12 md:rounded-xl md:mx-auto"
      )}
    >
      <InvoiceView invoice={invoice} editable={false} isAuth={false} />
    </main>
  );
}
