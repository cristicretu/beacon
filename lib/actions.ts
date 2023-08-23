"use server";
import { Base } from "deta";
import { Contact, Invoice } from "./types";
import { revalidatePath } from "next/cache";

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
 revalidatePath("/");
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

 const newContact = await db.put(contact);

 revalidatePath("/");
}
