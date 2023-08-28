import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react";
import { getInvoices } from "@/lib/actions";
import { convertDate } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Settings } from "@/components/settings";
import { InvoiceNav } from "@/components/invoice-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beacon",
  description: "A simple way to create and share invoices.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const invoices = await getInvoices();

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'h-full min-h-screen relative w-full',
          "px-4 py-8 md:py-24 print:px-0 print:py-0",
          // "flex min-h-screen items-center justify-center",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div>
            <Sheet>
              <SheetTrigger asChild className="fixed top-4 left-4 print:hidden">
                <Button variant="default" size="icon" className="z-50 rounded-full">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <InvoiceNav invoices={invoices} />
              </SheetContent>
            </Sheet>
            <div>{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
