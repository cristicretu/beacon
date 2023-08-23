"use client";

import { Contact, Invoice } from "@/lib/types";
import { convertDate } from "@/lib/utils";
import React from "react";

import { DatePicker } from "./date-picker";
import { updateContact, updateDate } from "@/lib/actions";
import { Combobox } from "./combobox";



export async function InvoiceGrid({ invoice, editable, contacts }: { invoice: Invoice, editable: boolean, contacts: Contact[] }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8">
      <div className="flex flex-col text-neutral-500">
        <p>Issue Date</p>
        {editable ? (<DatePicker date={new Date(invoice.issue_date)} setDate={(date) => updateDate(invoice.key, date?.toDateString() ?? "", "issue_date")} />
        ) : (
          <p className="text-neutral-900 dark:text-neutral-100">{convertDate(invoice.issue_date)}</p>
        )}
      </div>

      <div className="flex flex-col text-neutral-500">
        <p>Due Date</p>
        {editable ? (<DatePicker date={new Date(invoice.due_date)} setDate={(date) => updateDate(invoice.key, date?.toDateString() ?? "", "due_date")} />
        ) : (
          <p className="text-neutral-900 dark:text-neutral-100">{convertDate(invoice.due_date)}</p>)}
      </div>

      <div className="flex flex-col text-neutral-500">
        <p>From</p>
        {editable ? (
          <Combobox contacts={contacts} selectedContact={invoice.from} setContact={(contact) => updateContact(invoice.key, contact, "from")} />
        ) : (
          <p className="text-neutral-500 flex flex-col items-start">
            <span className="text-neutral-900 dark:text-neutral-100">{invoice.from.name}</span>
            {invoice.from.city && (<span>{invoice.from.city},{invoice.from.state ? invoice.from.state : ''}</span>)}
            <span>{invoice.from.zip ? invoice.from.zip : ''},{invoice.from.country ? invoice.from.country : ''}</span>
            <span>{invoice.from.vatId}</span>
            <span>{invoice.from.iban}</span>
            <span>{invoice.from.swift}</span>
            <span>{invoice.from.currency}</span>
          </p>
        )
        }
      </div>

      <div className="flex flex-col text-neutral-500">
        <p>To</p>
        {editable ? (<Combobox contacts={contacts} selectedContact={invoice.to} setContact={(contact) => updateContact(invoice.key, contact, "to")} />
        ) : (
          <p className="text-neutral-500 flex flex-col items-start">
            <span className="text-neutral-900 dark:text-neutral-100">{invoice.to.name}</span>
            {invoice.to.city && (<span>{invoice.to.city},{invoice.to.state ? invoice.to.state : ''}</span>)}
            <span>{invoice.to.zip ? invoice.to.zip : ''},{invoice.to.country ? invoice.to.country : ''}</span>
            <span>{invoice.to.vatId}</span>
            <span>{invoice.to.iban}</span>
            <span>{invoice.to.swift}</span>
            <span>{invoice.to.currency}</span>
          </p>

        )}
      </div>

    </div >
  )
}
