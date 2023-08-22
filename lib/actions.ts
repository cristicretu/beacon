"use server";
import { Base } from "deta";
import { Invoice } from "./types";

export async function getInvoices() {
 const db = Base("invoices");

 const invoices = await db.fetch();

 return invoices.items as Invoice[];
}
