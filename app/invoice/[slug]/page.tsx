import { InvoiceView } from "@/components/invoice-view";
import { getInvoice } from "@/lib/actions";

export default async function InvoicePage({ params }: { params: { slug: string } }) {
  const invoice = await getInvoice(params.slug);

  if (!invoice) {
    return <div>Invoice not found</div>
  }

  return <main className="mx-auto max-w-3xl md:max-w-4xl md:w-[676px] print:w-[676px]">
    <InvoiceView invoice={invoice} editable={invoice.draft === true} />
  </main>
}