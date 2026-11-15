import type { ReactNode } from 'react'
import Script from 'next/script'
import { inter, poppins } from './fonts'
import { metadata } from './metadata'
import '../styles/globals.css'
import { Providers } from '@/components/providers'
import { SkipLink } from '@/components/SkipLink'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

export { metadata }

const GTM_ID = 'GTM-PXBWGW6C'
const isProduction = process.env.NODE_ENV === 'production'

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased w-full`}>
        <NextIntlClientProvider>
          <SkipLink />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        {isProduction && (
          <>
            <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
