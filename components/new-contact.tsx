"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createContact } from "@/lib/actions";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export function NewContact({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [vatId, setVatId] = useState('');
  const [iban, setIban] = useState('');
  const [swift, setSwift] = useState('');
  const [currency, setCurrency] = useState('');

  const formData = {
    name,
    address,
    city,
    state,
    zip,
    country,
    vatId,
    iban,
    swift,
    currency,
    contact_since: new Date().toDateString(),
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New contact</DialogTitle>
          <DialogDescription>
            Create a new contact to use in your invoices. You can edit this information later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name"
              placeholder="Acme Inc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address"
              placeholder="Rua do Ouro, 123"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input id="city"
              placeholder="Lisbon"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input id="state"
              placeholder="LB"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zip" className="text-right">
              Zip
            </Label>
            <Input id="zip"
              placeholder="1234-567"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input id="country"
              placeholder="Portugal"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vatId" className="text-right">
              VAT ID
            </Label>
            <Input id="vatId"
              placeholder="PT123456789"
              value={vatId}
              onChange={(e) => setVatId(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="iban" className="text-right">
              IBAN
            </Label>
            <Input id="iban"
              placeholder="PT50 0002 0123 1234 5678 9015 4"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="swift" className="text-right">
              Swift
            </Label>
            <Input id="swift"
              placeholder="BARCPTPL"
              value={swift}
              onChange={(e) => setSwift(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              Currency
            </Label>
            <Input id="currency"
              placeholder="EUR"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="col-span-3" />
          </div>

        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => createContact(formData)}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}