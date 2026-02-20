import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://espoch.edu.ec";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Ingeniería en Tecnologías de la Información - ESPOCH Sede Morona Santiago | Ecuador",
    template: "%s | Ingeniería TI - ESPOCH Morona Santiago",
  },
  description:
    "Carrera de Ingeniería en Tecnologías de la Información de la Escuela Superior Politécnica del Chimborazo, Sede Morona Santiago. Formación en TI, región amazónica, Ecuador. Información, malla curricular y campo ocupacional.",
  keywords: [
    "Ingeniería en Tecnologías de la Información",
    "Tecnologías de la Información",
    "ESPOCH",
    "Morona Santiago",
    "carrera universitaria Ecuador",
    "universidad Amazonía",
    "Sede Morona Santiago",
    "Escuela Superior Politécnica del Chimborazo",
    "ingeniería TI Ecuador",
    "región amazónica",
  ],
  authors: [{ name: "ESPOCH Sede Morona Santiago" }],
  creator: "ESPOCH",
  publisher: "ESPOCH",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: siteUrl,
    siteName: "Ingeniería en Tecnologías de la Información - ESPOCH Morona Santiago",
    title: "Ingeniería en Tecnologías de la Información - ESPOCH Sede Morona Santiago",
    description:
      "Carrera de Ingeniería en Tecnologías de la Información, ESPOCH Sede Morona Santiago, Ecuador. Formación en TI en la región amazónica.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingeniería en Tecnologías de la Información - ESPOCH Morona Santiago",
    description:
      "Carrera de Ingeniería en Tecnologías de la Información, ESPOCH Sede Morona Santiago, Ecuador.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "9nRuM_4g3lRnTpjyhDxECY8G7v0TzZVplSCH4y9JRI4",
  },
  alternates: { canonical: siteUrl },
  category: "education",
};
