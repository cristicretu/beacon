"use server";
import { Base } from "deta";
import { Contact, Invoice, InvoiceItem, InvoiceSubItem } from "./types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import sha256 from "crypto-js/sha256";
import { isAuth } from "./utils";

export async function getInvoices() {
  const db = Base("invoices");

  const invoices = await db.fetch();

  revalidatePath("/");
  return invoices.items as Invoice[];
}

export async function getContacts() {
  const db = Base("contacts");

  const contacts = await db.fetch();

  revalidatePath("/");
  return contacts.items as Contact[];
}

export async function getInvoice(key: string) {
  const db = Base("invoices");

  const invoice = await db.get(key);

  revalidatePath("/");
  return invoice as Invoice;
}

export async function updateInvoice(
  key: string,
  updatedFields: Partial<Invoice>
) {
  const db = Base("invoices");

  const auth = await isAuth();

  if (!auth) {
    return;
  }

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

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
    return;
  }

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

  const auth = await isAuth();

  if (!auth) {
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
  const auth = await isAuth();

  if (!auth) {
    return;
  }

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
  redirect(`/invoice/${newInvoice!.key}`);
}

export async function duplicateInvoice(key: string | undefined) {
  if (!key) {
    return;
  }

  const auth = await isAuth();

  if (!auth) {
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
  redirect(`/invoice/${newInvoice!.key}`);
}

export async function updateItem(
  key: string | undefined,
  item: InvoiceItem,
  id: string
) {
  if (!key) {
    return;
  }

  const auth = await isAuth();

  if (!auth) {
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

    items[index].quantity = items[index].quantity || 0;
    items[index].name = items[index].name || " ";
    items[index].description = items[index].description || " ";
    items[index].price = items[index].price || 0;

    await db.update({ items }, key);
  }
  revalidatePath("/");
}

export async function deleteItem(key: string | undefined, id: string) {
  if (!key) {
    return;
  }

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
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

    if (sub_item.relative) {
      const allItems = invoice.items as InvoiceItem[];

      const price = allItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      items[index].price = price * (sub_item.relative / 100);
    }

    await db.update({ sub_items: items }, key);
  }
  revalidatePath("/");
}

export async function deleteSubItem(key: string | undefined, id: string) {
  if (!key) {
    return;
  }

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
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
  let itemsTotal = 0;

  items.forEach((item) => {
    itemsTotal += item.price * item.quantity;
  });

  total += itemsTotal;
  sub_items.forEach((item) => {
    if (item.relative) {
      total += itemsTotal * (item.relative / 100);

      const id = item.id;
      const index = sub_items.findIndex((i) => i.id === id);
      if (
        index !== -1 &&
        sub_items[index].price !== itemsTotal * (item.relative / 100)
      ) {
        sub_items[index].price = itemsTotal * (item.relative / 100);
        db.update({ sub_items }, key);
      }
    } else {
      total += item.price;
    }
  });

  await db.update({ total }, key);
  revalidatePath("/");
}

export async function updateContactInfo(
  key: string | undefined,
  contact: Contact
) {
  if (!key) {
    return;
  }

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
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

  const auth = await isAuth();

  if (!auth) {
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

export async function addSubItem(
  invoiceKey: string | undefined,
  relative?: boolean
) {
  if (!invoiceKey) {
    return;
  }

  const auth = await isAuth();

  if (!auth) {
    return;
  }

  const db = Base("invoices");

  const inv = await db.get(invoiceKey);

  if (!inv) {
    return;
  }

  let sub_items = inv.sub_items as InvoiceSubItem[];

  let items = inv.items as InvoiceItem[];

  let total = 0;

  items.forEach((item) => {
    total += item.price * item.quantity;
  });

  sub_items.push({
    name: "New Item",
    price: relative ? total * 0.19 : 0,
    id: Math.random().toString(36).substr(2, 9),
    relative: relative ? 19 : undefined,
  });

  await db.update({ sub_items }, invoiceKey);
  revalidatePath("/");
}

// export async function setCookie(setter: boolean) {
//  if (setter) {
//   const db = Base("auth");

//   const base_auth = await db.fetch();
//   const auth = base_auth.items[0];

//   if (
//    !auth ||
//    !auth.expire ||
//    !auth.uuid ||
//    new Date(auth.expire as string).getTime() < new Date().getTime()
//   ) {
//    const nonce =
//     Math.random().toString(36).substring(2, 15) +
//     Math.random().toString(36).substring(2, 15);
//    const uuid = sha256(
//     nonce + "Invoyce" + new Date().getTime().toString()
//    ).toString();

//    //  delete all auths
//    for (const auth of base_auth.items) {
//     if (!auth.key) continue;
//     await db.delete(auth.key as string);
//    }

//    await db.put({
//     uuid,
//     expire: new Date(
//      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
//     ).toISOString(),
//    });

//    cookies().set("auth", uuid, {
//     secure: true,
//     sameSite: "lax",
//     httpOnly: true,
//     expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
//    });

//    return;
//   }

//   const uuid = auth.uuid;
//   const expire = auth.expire;

//   cookies().set("auth", uuid.toString(), {
//    secure: true,
//    sameSite: "lax",
//    httpOnly: true,
//    expires: new Date(expire as string),
//   });
//  } else {
//   cookies().delete("auth");
//  }
// }

// export async function isAuth() {
//  const authCookie = cookies().get("auth");

//  if (!authCookie) {
//   return false;
//  }

//  const db = Base("auth");

//  const auth = await db.fetch();

//  if (auth.count === 0) {
//   return false;
//  }

//  return auth.items[0].uuid === authCookie.value;
// }
