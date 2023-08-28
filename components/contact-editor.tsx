"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  checkDeletedContactActive,
  createContact,
  deleteContact,
  updateContactInfo,
} from "@/lib/actions";
import { Contact, Currency } from "@/lib/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { ComboboxCurrency } from "./combobox-currency";

type IContact = Contact & {
  [key: string]: string | any;
};

export function ContactEditor({
  children,
  contact,
}: {
  children: React.ReactNode;
  contact?: Contact;
}) {
  const [formData, setFormData] = useState<IContact>(
    contact
      ? contact
      : {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        vatId: "",
        iban: "",
        swift: "",
        currency: "",
        contact_since: new Date().toDateString(),
      }
  );

  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] edit-button">
        <DialogHeader>
          <DialogTitle>New contact</DialogTitle>
          <DialogDescription>
            Create a new contact to use in your invoices. You can edit this
            information later.
          </DialogDescription>
          <DialogDescription>
            {error}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 edit-button">
          {Object.keys(formData).map((field) => {
            if (field === "contact_since" || field === "key") return null;
            if (field === "currency")
              return (
                <div className="grid grid-cols-4 items-center gap-4 edit-button" key={field}>
                  <Label htmlFor={field} className="text-right">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <div className="text-neutral-500 edit-button">
                    <ComboboxCurrency
                      currency={formData.currency as Currency}
                      setCurrency={(currency) => handleInputChange("currency", currency)}
                    />
                  </div>
                </div>
              );
            return (
              <div className="grid grid-cols-4 items-center gap-4" key={field}>
                <Label htmlFor={field} className="text-right">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  placeholder={`Enter ${field}`}
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="col-span-3 edit-button"
                  required={field === "name" ? true : false}
                />
              </div>
            );
          })}
        </div>
        <DialogFooter className="">
          <DialogClose>
            <div className="flex justify-between items-center w-full edit-button gap-4">
              {contact && (
                <Button
                  type="submit"
                  variant="destructive"
                  onClick={() => {
                    checkDeletedContactActive(contact.key);
                    deleteContact(contact.key);
                  }}
                  className="edit-button"
                >
                  Delete Contact
                </Button>
              )}
              <Button
                type="submit"
                onClick={() => {
                  if (!formData.name) {
                    setError("Name is required");
                    return;
                  }
                  contact
                    ? updateContactInfo(contact.key, formData)
                    : createContact(formData);
                }}
                className="edit-button"
              >
                Save changes
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
