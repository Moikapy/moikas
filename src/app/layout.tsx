import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Moikas',
  description:
    "Dive into the heart of the digital evolution with Moikas.com. As an AI-enthusiast and a visionary AIpreneur, explore how Artificial Intelligence is reshaping the realms of News, Gaming, Programming, Technology, Art, and Media. Moikas illuminates the path towards the future, offering a unique blend of insightful articles, engaging tutorials, and the latest updates in the AI ecosystem. Whether you're a developer, gamer, or tech-savvy individual, Moikas is your gateway to understanding and engaging with the AI-driven world. Embark on a journey of discovery and stay ahead of the curve with Moikas.com.",
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
