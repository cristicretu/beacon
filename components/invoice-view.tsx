import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItems } from "./table-items";
import { TableSubtotal } from "./table-subtotal";
import { Invoice } from "@/lib/types";
import { InvoiceSettings } from "./invoice-settings";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InvoiceGrid } from "./invoice-grid";

export function InvoiceView({ invoice, editable }: { invoice: Invoice, editable: boolean }) {
  return (
    <div className="flex flex-col space-y-16 text-neutral-500 relative">
      <InvoiceSettings invoice={invoice} />

      {/* Top part */}
      <div className="flex flex-col space-y-8">
        <Avatar>
          <AvatarImage src="https://github.com/sha" alt="myself" />
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>

        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start md:space-y-0 gap-16">
          {/* Invoice Details */}
          <div className="flex flex-col">
            {editable ? (
              <div>
                <Label htmlFor="email">Invoice Name</Label>
                <Input type="text" id="name" placeholder={invoice.name} className="max-w-[144px]" />
              </div>
            ) : (
              <h1 className="text-neutral-950 dark:text-neutral-100">
                {invoice.name}
              </h1>
            )}
            <p>{invoice.to.name}</p>
            <span>${invoice.total}</span>
          </div>

          {/* Issue Date, Due Date, From, To Grid */}
          <InvoiceGrid invoice={invoice} editable={editable} />
        </div>
      </div>

      {/* Invoice Items */}
      <TableItems items={invoice.items} invoice_key={invoice.key} />

      {/* Total View */}
      <div className="flex justify-end w-full">
        <TableSubtotal />
      </div>

      {/* Note */}
      {invoice.notes && <p>{invoice.notes}</p>}
    </div >
  );
}

function Card({ description, text }: { description: string; text: string }) {
  return (
    <div className="flex flex-col text-neutral-500">
      <p>{description}</p>
      <p className="text-neutral-900 dark:text-neutral-100">{text}</p>
    </div>
  );
}
