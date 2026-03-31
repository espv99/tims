import type { ReactNode } from "react";
import { inter } from "./fonts";
import { metadata } from "./metadata";
import "../styles/globals.css";
import "../styles/brand.css";
import { Providers } from "@/components/providers";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased w-full`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
