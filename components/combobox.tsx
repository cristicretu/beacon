"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]


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
          className="w-[200px] justify-between"
        >
          {value
            ? contacts.find((contact) => contact.name === value)?.name
            : "Select contact..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search contacts..." />
          <CommandEmpty>No contact found.</CommandEmpty>
          <CommandGroup>
            {contacts.map((contact) => (
              <CommandItem
                key={contact.name}
                onSelect={() => {
                  setContact(contact)
                  setValue(contact.name)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === contact.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {contact.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )

}