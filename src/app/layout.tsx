// src/app/layout.tsx is anything that's common across all pages, like a nav bar and footer

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Anirank",
  description: "Project-300",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Button asChild variant="outline" className="bg-zinc-950 text-white hover:text-white hover:bg-zinc-950">
          <Link href="/">Go to Home Page</Link>
        </Button>
        <Button asChild variant="outline" className="bg-zinc-950 text-white hover:text-white hover:bg-zinc-950">
          <Link href="/about">Go to About Page</Link>
        </Button>
        <Button asChild variant="outline" className="bg-zinc-950 text-white hover:text-white hover:bg-zinc-950">
          <Link href="/contact">Go to Contact Page</Link>
        </Button>
        {/* Everything in the specific pages will be rendered after the layout optinons */}
        {children}
        {/* Footer would go here */}
      </body>
    </html>
  );
}
