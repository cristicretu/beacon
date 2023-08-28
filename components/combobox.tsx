"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Edit } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Contact } from "@/lib/types"
import { ContactEditor } from "./contact-editor"


export function Combobox({ contacts, selectedContact, setContact }: { contacts: Contact[], selectedContact: Contact, setContact: (contact: Contact) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(selectedContact.name)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between truncate"
        >
          {value
            ? contacts.find((contact) => contact.name === value)?.name
            : "Select contact..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-[200px] overflow-auto">
        <Command>
          <CommandInput placeholder="Search contacts..." />
          <CommandEmpty>No contact found.</CommandEmpty>
          <CommandGroup>
            {contacts.map((contact) => (
              <CommandItem
                key={contact.name}
                onSelect={() => {
                  // if edit-button is clicked, don't set the contact
                  if (document.activeElement?.classList.contains("edit-button")) {
                    return
                  }

                  setContact(contact)
                  setValue(contact.name)
                  setOpen(false)
                }}
                className="flex items-center justify-between"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === contact.name ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="flex-grow truncate">{contact.name}</span>
                <ContactEditor contact={contact}>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-500 edit-button">
                    <Edit className="h-4 w-4" />
                  </Button>
                </ContactEditor>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover >
  )

}