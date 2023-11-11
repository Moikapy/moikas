/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      topLevelImportPaths: [
        '@xstyled/styled-components',
        '@xstyled/styled-components/no-tags',
        '@xstyled/styled-components/native',
        '@xstyled/styled-components/primitives',
      ],
    },
  },
  env: {
    TWITCH_CHANNEL_NAME: process.env.TWITCH_CHANNEL_NAME,
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  redirects: async () => {
    return [
      {
        source: '/shop',
        destination: 'https://shop.moikas.com',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig
