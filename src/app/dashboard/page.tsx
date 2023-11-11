'use client';
import {useMemo, useState} from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga4';
import Navbar from '@/components/Navbar';
const sizes = {
  root: '0px',
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};
export const devices = {
  root: `(min-width: ${sizes.root})`,
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
};
const Main = styled.main`
  /* Add your main styles here if any */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Dashboard() {
  useMemo(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID || '');
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: '/dashbboard/login',
      title: 'Moikas',
    });
  }, [process.env.GA_TRACKING_ID]);

  return (
    <Main>
      <Navbar />
    </Main>
  );
}
