/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: '/digital',
        destination: 'https://moikapylookout.gumroad.com/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: 'https://moikas.beehiiv.com/',
        permanent: false,
      }

    ];
  },
  async rewrites() {
    return [
      {
        source: '/404',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig
