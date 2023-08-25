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
import { Currency } from "@/lib/types"
import currencyList, { currencySymbol } from "@/lib/currencies"


export function ComboboxCurrency({ currency, setCurrency }: { currency: Currency, setCurrency: (contact: Currency) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(currency)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          {value
            ? currencyList.find((currency) => currency === value)
            : "Select currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-[200px] overflow-hidden">
        <Command>
          <CommandInput placeholder="Search currencies..." />
          <CommandEmpty>No contact found.</CommandEmpty>
          <CommandGroup>
            {currencyList.map((currency) => (
              <CommandItem
                key={currency}
                onSelect={() => {
                  setCurrency(currency as Currency)
                  setValue(currency as Currency)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === currency ? "opacity-100" : "opacity-0"
                  )}
                />
                {currency}{" "}
                <span className="opacity-50 ml-2 text-xs">{currencySymbol(currency)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )

}