import type { ReactNode } from "react";
import { geistSans, geistMono } from "./fonts";
import { metadata } from "./metadata";
import "../styles/globals.css";
import "../styles/brand.css";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        {children}
      </body>
    </html>
  );
}
