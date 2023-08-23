import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Beacon",
 description: "A simple way to create and share invoices.",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
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
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}
