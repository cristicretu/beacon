"use client";

import { Contact, Invoice } from "@/lib/types";
import { convertDate } from "@/lib/utils";
import { DatePicker } from "./date-picker";
import { updateContact, updateDate, updateField } from "@/lib/actions";
import { Combobox } from "./combobox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { NewContact } from "./new-contact";
import { ComboboxCurrency } from "./combobox-currency";

export function InvoiceGrid({
  invoice,
  editable,
  contacts,
}: {
  invoice: Invoice;
  editable: boolean;
  contacts: Contact[];
}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8">
      <div className="flex flex-col text-neutral-500">
        <p>Issue Date</p>
        {editable ? (
          <DatePicker
            date={new Date(invoice.issue_date)}
            setDate={(date) =>
              updateDate(invoice.key, date?.toDateString() ?? "", "issue_date")
            }
          />
        ) : (
          <p className="text-neutral-900 dark:text-neutral-100">
            {convertDate(invoice.issue_date)}
          </p>
        )}
      </div>

      <div className="flex flex-col text-neutral-500">
        <p>Due Date</p>
        {editable ? (
          <DatePicker
            date={new Date(invoice.due_date)}
            setDate={(date) =>
              updateDate(invoice.key, date?.toDateString() ?? "", "due_date")
            }
          />
        ) : (
          <p className="text-neutral-900 dark:text-neutral-100">
            {convertDate(invoice.due_date)}
          </p>
        )}
      </div>

      <div className="flex flex-col text-neutral-500">
        {Object.keys(invoice.from).length !== 0 || editable ? <p>From</p> : null}
        {editable ? (
          <div className="flex space-x-1">
            <Combobox
              contacts={contacts}
              selectedContact={invoice.from}
              setContact={(contact) => updateContact(invoice.key, contact, "from")}
            />
            <NewContact>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </NewContact>
          </div>
        ) : (
          Object.keys(invoice.from).length !== 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-neutral-900 dark:text-neutral-100 w-fit border-b-2 border-transparent hover:border-neutral-500/50 transition-all cursor-cell">
                  @{invoice.from.name}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="text-neutral-500 space-y-1 flex flex-col text-sm">
                    <h4 className="text-neutral-900 dark:text-neutral-100 font-semibold">
                      @{invoice.from.name}
                    </h4>
                    <span>{invoice.from.address}</span>
                    {invoice.from.city && (
                      <span>
                        {invoice.from.city},{invoice.from.state ? invoice.from.state : ""}
                      </span>
                    )}
                    <span>
                      {invoice.from.zip ? invoice.from.zip : ""},{" "}
                      {invoice.from.country ? invoice.from.country : ""}
                    </span>
                    <span>Vat ID: {invoice.from.vatId}</span>
                    <span>IBAN: {invoice.from.iban}</span>
                    <span>Swift: {invoice.from.swift}</span>
                    <span>Currency: {invoice.from.currency}</span>
                    {invoice.from.contact_since && (
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Contact since {convertDate(invoice.from.contact_since)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )
        )}
      </div>

      <div className="flex flex-col text-neutral-500">
        {Object.keys(invoice.to).length !== 0 || editable ? <p>to</p> : null}
        {editable ? (
          <div className="flex space-x-1">
            <Combobox
              contacts={contacts}
              selectedContact={invoice.to}
              setContact={(contact) => updateContact(invoice.key, contact, "to")}
            />
            <NewContact>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </NewContact>
          </div>
        ) : (
          Object.keys(invoice.to).length !== 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-neutral-900 dark:text-neutral-100 border-b-2 w-fit border-transparent hover:border-neutral-500/50 transition-all cursor-cell">
                  @{invoice.to.name}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="text-neutral-500 space-y-1 flex flex-col text-sm">
                    <h4 className="text-neutral-900 dark:text-neutral-100 font-semibold">
                      @{invoice.to.name}
                    </h4>
                    <span>{invoice.to.address}</span>
                    {invoice.to.city && (
                      <span>
                        {invoice.to.city},{invoice.to.state ? invoice.to.state : ""}
                      </span>
                    )}
                    <span>
                      {invoice.to.zip ? invoice.to.zip : ""},{" "}
                      {invoice.to.country ? invoice.to.country : ""}
                    </span>
                    <span>Vat ID: {invoice.to.vatId}</span>
                    <span>IBAN: {invoice.to.iban}</span>
                    <span>Swift: {invoice.to.swift}</span>
                    <span>Currency: {invoice.to.currency}</span>
                    {invoice.to.contact_since && (
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Contact since {convertDate(invoice.to.contact_since)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )
        )}
      </div>

      {editable && (
        <div className="flex flex-col">
          Currency
          <ComboboxCurrency
            currency={invoice.currency}
            setCurrency={(currency) => updateField(invoice.key, currency, "currency")}
          />
        </div>
      )}
    </div>
  );
}
