import { InvoiceView } from "@/components/invoice-view";
import { getInvoice } from "@/lib/actions";

export default async function InvoicePage({ params }: { params: { slug: string } }) {
  const invoice = await getInvoice(params.slug);

  console.log(invoice);

  return <main className="mx-auto max-w-4xl w-[676px]">
    <InvoiceView invoice={invoice} editable={invoice.draft === true} />
  </main>
}