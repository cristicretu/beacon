"use client"

import { Plus } from "lucide-react";
import { ModeToggle } from "./change-theme";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createInvoice } from "@/lib/actions";

export function Settings() {
  let [isPending, startTransition] = useTransition()

  return (
    <>
      <Button variant="default" onClick={() => startTransition(() => createInvoice())}>
        <Plus className="h-4 w-4 mr-2" />
        Compose
      </Button>

      <ModeToggle />
    </>
  );
}
