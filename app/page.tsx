import { InvoiceView } from "@/components/invoice-view";
import { getInvoices } from "@/lib/actions";

export default async function Home() {
  const invoices = await getInvoices();
  return (
    <main className="mx-auto max-w-4xl w-[676px]">
      maxuuuuuuuuuuuuu
      {/* <InvoiceView invoice={invoices[0]} editable={true} /> */}
    </main>
  );
}
