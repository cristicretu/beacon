"use client"

import { Printer } from "lucide-react";
import { Button } from "./ui/button";

export default function PrintButton() {
  return (
    <Button variant="ghost" onClick={() => window.print()} className="print:hidden w-fit">
      <Printer className="mr-2 h-4 w-4" />
      <span>Print</span>
    </Button>
  )
}