import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moikas',
  description: 'AI Assisted Creator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='google-adsense-account'
          content='ca-pub-5408519350906957'></meta>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap-grid.min.css'
          rel='stylesheet'
          integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
          crossOrigin='anonymous'></link>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap-utilities.min.css'
          rel='stylesheet'
          integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
          crossOrigin='anonymous'></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
          rel='stylesheet'></link>
      </head>

      <body className={inter.className}>{children}</body>

      <script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5408519350906957'
        crossOrigin='anonymous'></script>

      <ins
        className='adsbygoogle'
        data-ad-client='ca-pub-5408519350906957'
        data-ad-slot='1130140494'
        data-ad-format='auto'
        data-full-width-responsive='true'></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </html>
  );
}
