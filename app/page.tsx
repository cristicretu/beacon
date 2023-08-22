import { InvoiceView } from "@/components/invoice-view";
import { getInvoices } from "@/lib/actions";

export default async function Home() {
 const invoices = await getInvoices();

 console.log(invoices);

 return (
  <main className="w-full">
   <InvoiceView invoice={invoices[0]} />
  </main>
 );
}
