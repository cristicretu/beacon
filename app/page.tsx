import { CurrencySplit } from "@/components/currency-split";
import { Settings } from "@/components/settings";
import { getContacts, getInvoices } from "@/lib/actions";

export default async function Home() {
  const invoices = (await getInvoices()) as any;
  const contacts = (await getContacts()) as any;

  const simplifiedArray = invoices
    .filter((invoice: any) => invoice.paid === true)
    .map(({ currency, total }: { currency: any; total: any }) => ({
      currency,
      total,
    }))
    .sort((a: any, b: any) => b.total - a.total);

  return (
    <main className="mx-auto max-w-4xl flex flex-col items-center text-neutral-500">
      <h1 className="text-neutral-900 dark:text-neutral-100">Beacon.</h1>
      <p>An uncomplicated yet sturdy application for overseeing your invoices.</p>

      <div className="mt-12 w-full rounded-lg bg-neutral-50 dark:bg-neutral-900 px-24 py-12">
        {invoices.length > 0 ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-neutral-900 dark:text-neutral-100 font-semibold text-2xl">
                {simplifiedArray.length > 0 ? (
                  <CurrencySplit
                    currency={simplifiedArray[0].currency}
                    total={simplifiedArray[0].total}
                  />
                ) : (
                  "0"
                )}
              </h1>
              <p>Money Earned</p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-neutral-900 dark:text-neutral-100 font-semibold text-2xl">
                {invoices.length}
              </h1>
              <p>Invoices Created</p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-neutral-900 dark:text-neutral-100 font-semibold text-2xl">
                {contacts.length}
              </h1>
              <p>Saved Contacts</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center flex-col gap-4">
            Looks like you don&apos;t have any invoices yet. Create your first one now{" "}
            {":)"}
            <Settings theme={false} />
          </div>
        )}
      </div>
    </main>
  );
}