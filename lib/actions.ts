"use server";
import { Base } from "deta";
import { Contact, Invoice, InvoiceItem, InvoiceSubItem } from "./types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getInvoices() {
 const db = Base("invoices");

 const invoices = await db.fetch();

 return invoices.items as Invoice[];
}

export async function getContacts() {
 const db = Base("contacts");

 const contacts = await db.fetch();

 return contacts.items as Contact[];
}

export async function getInvoice(key: string) {
 const db = Base("invoices");

 const invoice = await db.get(key);

 return invoice as Invoice;
}

export async function updateInvoice(
 key: string,
 updatedFields: Partial<Invoice>
) {
 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 const updatedInvoice = await db.update(updatedFields, key);

 return updatedInvoice;
}

export async function updateStatus(
 key: string | undefined,
 status: "draft" | "paid"
) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 const draft = invoice.draft;
 const paid = invoice.paid;

 if (status === "draft") {
  await db.update({ draft: !draft, paid: false }, key);
 } else if (status === "paid") {
  await db.update({ paid: !paid }, key);
 }

 revalidatePath("/");
}

export async function deleteInvoice(key: string | undefined) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 await db.delete(key);
 redirect("/");
}

export async function updateDate(
 key: string | undefined,
 date: string,
 field: "issue_date" | "due_date"
) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 await db.update({ [field]: date }, key);
 revalidatePath("/");
}

export async function updateContact(
 key: string | undefined,
 contact: Contact,
 field: "from" | "to"
) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 await db.update({ [field]: contact }, key);
 revalidatePath("/");
}

export async function createContact(contact: Contact) {
 const db = Base("contacts");

 if (!contact.name) {
  return;
 }

 const newContact = await db.put(contact);

 revalidatePath("/");
}

export async function updateField(
 key: string | undefined,
 name: string,
 field: string
) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 await db.update({ [field]: name }, key);
 revalidatePath("/");
}

export async function createInvoice() {
 const db = Base("invoices");

 const newInvoice = await db.put({
  name: "New Invoice",
  issue_date: new Date().toISOString().split("T")[0],
  due_date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)
   .toISOString()
   .split("T")[0],
  from: {},
  to: {},
  items: [],
  sub_items: [],
  notes: "",
  paid: false,
  draft: true,
  total: 0,
  currency: "EUR",
 });

 revalidatePath("/");
}

export async function duplicateInvoice(key: string | undefined) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 // Remove the key from the invoice
 delete invoice.key;

 // Find the number at the end of the oldName, if any
 const oldName = invoice.name as string;

 const match = oldName.match(/(\d+)$/);
 let newName;

 if (match) {
  const number = parseInt(match[1]);
  const incrementedNumber = number + 1;
  const paddedNumber = incrementedNumber
   .toString()
   .padStart(match[1].length, "0");
  newName = oldName.replace(match[0], paddedNumber);
 } else {
  newName = `${oldName} 01`;
 }

 const newInvoice = await db.put({
  ...invoice,
  name: newName,
  draft: true,
  paid: false,
 });
 revalidatePath("/");
}

export async function updateItem(
 key: string | undefined,
 item: InvoiceItem,
 id: string
) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 const items = invoice.items as InvoiceItem[];

 const index = items.findIndex((i) => i.id === id);

 if (index !== -1) {
  items[index] = item;

  await db.update({ items }, key);
 }
 revalidatePath("/");
}

export async function deleteItem(key: string | undefined, id: string) {
 if (!key) {
  return;
 }

 if (!id) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 const items = invoice.items as InvoiceItem[];

 const index = items.findIndex((i) => i.id === id);

 if (index !== -1) {
  items.splice(index, 1);

  await db.update({ items }, key);
 }
 revalidatePath("/");
}

export async function updateSubItem(
 key: string | undefined,
 sub_item: InvoiceSubItem,
 id: string
) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 const items = invoice.sub_items as InvoiceSubItem[];

 const index = items.findIndex((i) => i.id === id);

 if (index !== -1) {
  items[index] = sub_item;

  await db.update({ sub_items: items }, key);
 }
 revalidatePath("/");
}

export async function deleteSubItem(key: string | undefined, id: string) {
 if (!key) {
  return;
 }

 if (!id) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 const items = invoice.sub_items as InvoiceSubItem[];

 const index = items.findIndex((i) => i.id === id);

 if (index !== -1) {
  items.splice(index, 1);

  await db.update({ sub_items: items }, key);
 }
 revalidatePath("/");
}

export async function updateTotal(key: string | undefined) {
 if (!key) {
  return;
 }

 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return;
 }

 const items = invoice.items as InvoiceItem[];
 const sub_items = invoice.sub_items as InvoiceSubItem[];

 let total = 0;

 items.forEach((item) => {
  total += item.price * item.quantity;
 });

 sub_items.forEach((item) => {
  total += item.price;
 });

 await db.update({ total }, key);
 revalidatePath("/");
}

export async function updateContactInfo(
 key: string | undefined,
 contact: Contact
) {
 console.log("aici taica");
 if (!key) {
  return;
 }

 const db = Base("contacts");

 const contactInfo = await db.get(key);

 if (!contactInfo) {
  return;
 }

 delete contact.key;

 await db.update(contact, key);
 revalidatePath("/");
}

export async function deleteContact(key: string | undefined) {
 if (!key) {
  return;
 }

 const db = Base("contacts");

 const contactInfo = await db.get(key);

 if (!contactInfo) {
  return;
 }

 await db.delete(key);
 revalidatePath("/");
}

export async function checkDeletedContactActive(
 contactKey: string | undefined
) {
 if (!contactKey) {
  return;
 }

 const db = Base("invoices");

 const invoices = await db.fetch();

 if (!invoices) {
  return;
 }

 for (const invoice of invoices.items as Invoice[]) {
  if (!invoice.key) continue;
  if (invoice.from || invoice.to) {
   let from = invoice.from;
   const to = invoice.to as Contact;

   if (from) {
    if (from.key === contactKey) {
     await db.update({ from: { deleted: true } }, invoice.key);
    }
   }

   if (to) {
    if (to.key === contactKey) {
     await db.update({ to: { deleted: true } }, invoice.key);
    }
   }
  }
 }

 revalidatePath("/");
}
