import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItems } from "./table-items";
import { TableSubtotal } from "./table-subtotal";
import { Invoice } from "@/lib/types";
import { convertDate } from "@/lib/utils";

export function InvoiceView({ invoice }: { invoice: Invoice }) {
 return (
  <div className="flex flex-col space-y-16 text-neutral-500">
   {/* Top part */}
   <div className="flex flex-col space-y-8">
    <Avatar>
     <AvatarImage src="https://github.com/sha" alt="myself" />
     <AvatarFallback>DS</AvatarFallback>
    </Avatar>

    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start md:space-y-0">
     {/* Invoice Details */}
     <div className="flex flex-col">
      <h1 className="text-neutral-950 dark:text-neutral-100">
       Invoice {invoice.number}
      </h1>
      <p>{invoice.to.name}</p>
      <span>${invoice.total}</span>
     </div>

     {/* Issue Date, Due Date, From, To Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8">
      <Card description="Issue Date" text={convertDate(invoice.issue_date)} />
      <Card description="Due Date" text={convertDate(invoice.due_date)} />
      <Card description="From" text={invoice.from.name} />
      <Card description="To" text={invoice.to.name} />
     </div>
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
  </div>
 );
}

function Card({ description, text }: { description: string; text: string }) {
 return (
  <div className="flex flex-col text-neutral-500">
   <p>{description}</p>
   <p className="text-neutral-900">{text}</p>
  </div>
 );
}
