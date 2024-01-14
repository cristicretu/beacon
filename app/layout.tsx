import Auth from "@/components/auth";
import { InvoiceNav } from "@/components/invoice-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { getInvoices, isAuth } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoyce",
  description: "Create and store your invoices.",
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1",
  icons: ["/favicon.ico"],
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const invoices = await getInvoices();

  const authPromise = isAuth();
  const auth = await authPromise; 

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
            {auth && (
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
            )}
            <Auth />
            <div>{children}</div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
