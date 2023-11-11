'use client';
import {useMemo, useState} from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga4';
import Navbar from '@/components/Navbar';
import Blog_Feed from '@/components/Blog_Feed';

const Main = styled.main`
  /* Add your main styles here if any */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Blog() {
  const [blog_items, setBloogItems] = useState([{title: 'test'}]);
  useMemo(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID || '');
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: '/blog',
      title: 'Moikas | Blog',
    });
  }, [process.env.GA_TRACKING_ID]);

  return (
    <Main>
      <Navbar />
      <Blog_Feed items={blog_items} isCard={true} />
    </Main>
  );
}
