import type { Metadata } from "next";
import { geistSans, geistMono } from "./fonts";
import "../styles/globals.css";
import "../styles/brand.css";

import { ReactNode, useEffect } from 'react';


export const metadata: Metadata = {
 title: "Tecnologias de la Informacion",
 description: "Pagina de Tecnologias de la Informacion de la Escuela Superior Politecnica del Chimborazo",
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          {children}
        
      </body>
    </html>
  );
}
