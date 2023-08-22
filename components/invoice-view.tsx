import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItems } from "./table-items";
import { cn } from "@/lib/utils";
import { TableSubtotal } from "./table-subtotal";

export function InvoiceView() {
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
      <h1 className="text-neutral-950 dark:text-neutral-100">Invoice 04</h1>
      <p>hello@deta.space</p>
      <span>$17,850.00</span>
     </div>

     {/* Issue Date, Due Date, From, To Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8">
      <Card description="Issue Date" text="11 July, 2023" />
      <Card description="Due Date" text="23 July, 2023" />
      <Card description="From" text="Shad Mirza" />
      <Card description="To" text="Deta Space" />
     </div>
    </div>
   </div>

   {/* Invoice Items */}
   <TableItems />

   {/* Total View */}
   <div className="flex justify-end w-full">
    <TableSubtotal />
   </div>

   {/* Note */}
   <p>
    The customer must self-account for VAT on the reverse charge basis in their
    own jurisdiction. The VAT is not taxable in Romania.
   </p>
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
