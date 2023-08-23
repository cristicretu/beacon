import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableItems } from "./table-items";
import { TableSubtotal } from "./table-subtotal";
import { Invoice } from "@/lib/types";
import { convertDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check, CircleDashed, MoreHorizontal, Share, Trash, Wallet } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Base } from "deta";
import { revalidatePath } from "next/cache";

export function InvoiceView({ invoice }: { invoice: Invoice }) {
  async function updateStatus(status: "draft" | "paid") {
    "use server";

    if (!invoice.key) {
      return;
    }
  
    const db = Base("invoices");
  
    const dbInvoice = await db.get(invoice.key);
  
    if (!dbInvoice) {
     return;
    }

    const paid = dbInvoice.paid
    const draft = dbInvoice.draft

    if (status === "draft") {
      await db.update({ draft: !draft }, invoice.key);
    } else if (status === "paid") {
      await db.update({ paid: !paid }, invoice.key);
    }
  
    revalidatePath("/"); 
   }

  console.log(invoice.draft, invoice.paid)
  revalidatePath("/");

 return (
  <div className="flex flex-col space-y-16 text-neutral-500 relative">
    <div className="w-full flex justify-end">
      {invoice.draft === true ? (
         <Button variant="ghost" formAction={updateStatus("draft")}>
          <Check className="mr-2 h-4 w-4" />
            Publish
          </Button> 
      ) : invoice.draft === false && invoice.paid === false ? (
          <Button variant="ghost" formAction={updateStatus("paid")}>
          <Check className="mr-2 h-4 w-4" />
            Mark Paid
        </Button>
      ) : (
        <Badge variant="success">Paid</Badge>
      )}
      
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Invoice {invoice.number}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleDashed className="mr-2 h-4 w-4" />
            <span>Toggle Draft</span>
          </DropdownMenuItem>
          <DropdownMenuItem >
            <Wallet className="mr-2 h-4 w-4" />
            <span>Toggle Paid</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share className="mr-2 h-4 w-4" />
            <span>Share</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
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
   <p className="text-neutral-900 dark:text-neutral-100">{text}</p>
  </div>
 );
}
