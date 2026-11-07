import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

function supabaseImagePatterns(): NonNullable<NextConfig['images']>['remotePatterns'] {
  try {
    const { protocol, hostname, port } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '')
    return [
      {
        protocol: protocol === 'http:' ? 'http' : 'https',
        hostname,
        port,
        pathname: '/storage/v1/object/public/**',
      },
    ]
  } catch {
    return []
  }
}

const nextConfig: NextConfig = {
  // Next streams <meta> tags into <body> for user agents it does not know as search bots, and Google's
  // site-verification fetcher is one of them, so it never sees the tag. Serve metadata in <head> for everyone.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: supabaseImagePatterns(),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
