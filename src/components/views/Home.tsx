'use client';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {useMemo, useState, useContext} from 'react';
import ReactGA from 'react-ga4';
const Navbar = dynamic(() => import('@/components/Navbar'), {ssr: true});
const Header = dynamic(() => import('@/components/Header'), {ssr: true});
const TwitchStream = dynamic(() => import('@/components/TwitchStream'), {
  ssr: false,
});
const RSSFeed = dynamic(() => import('@/components/rss_feed'), {ssr: true});

import Data_Provider, {Data_Context} from '@/components/Data_Provider';

import {sizes, devices} from '@/styles/index';
const Main = styled.main`
  /* Add your main styles here if any */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;
`;

const Iframe = styled.iframe`
width: 100%;
  @media ${devices.root} {
    margin: 0 auto;
    max-width: 425px;
  }
  @media ${devices.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
  }
  @media ${devices.laptop} {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 800px;
  }
`;

export default function Home() {
  const [showHeader, setShowHeader] = useState(true);

  const [showRSSFeed, setShowRSSFeed] = useState(true);
  const [loading, setLoading] = useState(true);
  useMemo(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID || '');
    // Send pageview with a custom path
    ReactGA &&
      ReactGA?.send({
        hitType: 'pageview',
        page: '/',
        title: 'Moikas',
      });
  }, [process.env.GA_TRACKING_ID]);
  return (
    <Data_Provider>
      <Main>
        <Navbar />
        {loading && (
          <Container>
            {showHeader && <Header />}

            <TwitchStream
            onComplete={(e: boolean): void => {
              setShowHeader(!e);
            }}
          />
            <Iframe
            src='https://embeds.beehiiv.com/da38b479-5278-4c4f-92da-65fd877960bf?slim=true'
            data-test-id='beehiiv-embed'
            ></Iframe>
            {/* Conditional rendering based on showRSSFeed state */}
            {showRSSFeed && (
            <RSSFeed
              isCard
              title='Latest'
              urls={[
                'https://rss.beehiiv.com/feeds/lZKp0ZrfNi.xml',
                'https://www.youtube.com/feeds/videos.xml?channel_id=UCIjgVUuzx_H0ZrUK-6J_QiQ',
                'https://www.etsy.com/shop/moikaslookout/rss',
              ]}
              onComplete={() => setLoading(true)}
            />
          )}
          </Container>
        )}
      </Main>
    </Data_Provider>
  );
}
