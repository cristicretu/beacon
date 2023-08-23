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
import { ModeToggle } from "@/components/change-theme";
import Link from "next/link";

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
          'h-full, min-h-screen, relative w-full',
          "flex min-h-screen items-center justify-center p-8 sm:p-12 md:p-24",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div>
            <Sheet>
              <SheetTrigger asChild className="absolute top-4 left-4">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 w-fit">
                  {invoices.map((invoice) => (
                    <SheetClose asChild key={invoice.key}>
                      <Button variant="ghost" className="text-neutral-500 font-normal flex items-center justify-between min-w-[300px] py-8" asChild>
                        <a
                          href={`/invoice/${invoice.key}`}>
                          <span className="flex flex-col items-start space-y-0.5">
                            <span className="text-neutral-900 dark:text-neutral-100">{invoice.name}</span>
                            <span>{invoice.to.name}</span>
                          </span>

                          <span className="flex flex-col items-end space-y-0.5">
                            <span className="text-neutral-900 dark:text-neutral-100">${invoice.total}</span>
                            <span>{convertDate(invoice.due_date)}</span>
                          </span>
                        </a>
                      </Button>
                    </SheetClose>
                  ))}

                  <div className="px-4">
                    <ModeToggle />
                  </div>

                </div>
              </SheetContent>
            </Sheet>
            <div>{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
