"use server";
import { Base } from "deta";
import { Invoice } from "./types";

export async function getInvoices() {
 const db = Base("invoices");

 const invoices = await db.fetch();

 return invoices.items as Invoice[];
}

export async function updateInvoice(
 key: string,
 updatedFields: Partial<Invoice>
) {
 const db = Base("invoices");

 const invoice = await db.get(key);

 if (!invoice) {
  return null;
 }

 const updatedInvoice = await db.update(updatedFields, key);

 return updatedInvoice;
}
