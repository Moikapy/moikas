import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Moikas',
  description:
    'Explore Moikas.com for cutting-edge AI solutions and insights. Dive into our blog for the latest trends, shop the newest AI gear, and discover digital products that keep you ahead in the fast-evolving world of artificial intelligence.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='google-adsense-account'
          content='ca-pub-5408519350906957'></meta>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap-grid.min.css'
          rel='stylesheet'
          crossOrigin='anonymous'></link>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap-utilities.min.css'
          rel='stylesheet'
          crossOrigin='anonymous'></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
          rel='stylesheet'></link>

        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5408519350906957'
          crossOrigin='anonymous'></script>

        <script async>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </head>

      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
          <ins
            className='adsbygoogle'
            data-ad-client='ca-pub-5408519350906957'
            data-ad-slot='1130140494'
            data-ad-format='auto'
            data-full-width-responsive='true'></ins>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
