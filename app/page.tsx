import { InvoiceView } from "@/components/invoice-view";
import { Button } from "@/components/ui/button";
import { getInvoices } from "@/lib/actions";
import { convertDate } from "@/lib/utils";

export default async function Home() {

  return (
    <main className="mx-auto max-w-4xl w-[676px]">
      Welcome to beacon.
    </main>
  );
}
