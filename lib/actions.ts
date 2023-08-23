"use server";
import { Base } from "deta";
import { Invoice } from "./types";
import { revalidatePath } from "next/cache";

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
  return;
 }

 const updatedInvoice = await db.update(updatedFields, key);

 return updatedInvoice;
}

export async function updateStatus(key: string | undefined, status: "draft" | "paid") {
  if (!key) {
    return;
  }

  const db = Base("invoices");

  const invoice = await db.get(key);

  if (!invoice) {
    return;
  }

  const draft = invoice.draft
  const paid = invoice.paid

  if (status === "draft") {
    await db.update({ draft: !draft, paid: false }, key);
  } else if (status === "paid") {
    await db.update({ paid: !paid }, key);
  }

  revalidatePath("/")
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
  revalidatePath("/")
}
