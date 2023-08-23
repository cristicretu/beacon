"use client";

import { Contact, Invoice } from "@/lib/types";
import { convertDate } from "@/lib/utils";
import React from "react";

import { DatePicker } from "./date-picker";
import { Input } from "./ui/input";
import { updateDate } from "@/lib/actions";



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
        {editable ? (<Input type="text" id="name" placeholder={invoice.from.name} />
        ) : (
          <p className="text-neutral-900 dark:text-neutral-100">{invoice.from.name}</p>)}
      </div>

      <div className="flex flex-col text-neutral-500">
        <p>To</p>
        {editable ? (<Input type="text" id="name" placeholder={invoice.to.name} />
        ) : (
          <p className="text-neutral-900 dark:text-neutral-100">{invoice.to.name}</p>)}
      </div>

    </div >
  )
}