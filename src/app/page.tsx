'use client';
import Image from 'next/image';
import RSSFeed from '@/components/rss-feed';
import {useState} from 'react';
import styled from 'styled-components';
import styles from './page.module.css';
import TwitchStream from '@/components/TwitchStream';
import Navbar from '@/components/Navbar';
const sizes = {
  none: '0px',
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};
export const devices = {
  none: `(min-width: ${sizes.none})`,
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
const Container = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  max-width: 800px;
  width: 100vw;
  min-width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 250px;
`;

const Button_Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
`;
const Brand_name = styled.h1`
  font-family: Montserrat;
  font-size: 96px;
  font-weight: 400;
  line-height: 117px;
  letter-spacing: 0em;
  text-align: left;
`;

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  border: none;
  background-color: #0070f3;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
const Iframe = styled.iframe`
  @media ${devices.none} {
    display: none;
  }
  @media ${devices.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showRSSFeed, setShowRSSFeed] = useState<boolean>(true);

  return (
    <Main>
      <Navbar />
      {loading && (
        <Container>
          <Header>
            <Brand_name>MOIKAS</Brand_name>
            <Iframe
              src='https://embeds.beehiiv.com/da38b479-5278-4c4f-92da-65fd877960bf?slim=true'
              data-test-id='beehiiv-embed'
              height='52'
              width='500'
              frameBorder='0'
              scrolling='no'></Iframe>
            <Button onClick={() => setShowRSSFeed(!showRSSFeed)}>Toggle</Button>
          </Header>
          {/* <TwitchStream /> */}
          {/* Conditional rendering based on showRSSFeed state */}
          {showRSSFeed && (
            <RSSFeed
              title='Latest'
              urls={[
                'https://rss.beehiiv.com/feeds/lZKp0ZrfNi.xml',
                'https://www.youtube.com/feeds/videos.xml?channel_id=UCIjgVUuzx_H0ZrUK-6J_QiQ',
              ]}
              onComplete={() => setLoading(true)}
            />
          )}
        </Container>
      )}
    </Main>
  );
}
