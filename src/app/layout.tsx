// src/app/layout.tsx is anything that's common across all pages, like a nav bar and footer

import React from "react";
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
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline" className="bg-zinc-950 text-white hover:text-white hover:bg-zinc-950">
          <Link href="/anime">Anime</Link>
        </Button>
        <Button asChild variant="outline" className="bg-zinc-950 text-white hover:text-white hover:bg-zinc-950">
          <Link href="/reviews">Reviews</Link>
        </Button>
        {/* Everything in the specific pages will be rendered after the layout optinons */}
        {children}
        {/* Footer would go here */}
      </body>
    </html>
  );
}
