'use client';
import ReactGA from 'react-ga4';
import _Home from '@/components/views/Home';
import {useMemo} from 'react';

export default function Home() {
  useMemo(() => {
    // Send pageview with a custom path
    ReactGA &&
      ReactGA?.send({
        hitType: 'pageview',
        page: '/',
        title: 'Moikas',
      });
  }, [process.env.GA_TRACKING_ID]);
  return <_Home />;
}
