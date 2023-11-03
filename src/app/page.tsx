"use client";
import Image from "next/image";
import RSSFeed from "@/components/rss-feed";
import { useMemo, useState } from "react";
import styled from "styled-components";
import styles from "./page.module.css";
import TwitchStream from "@/components/TwitchStream";
import ReactGA from "react-ga4";
import Navbar from "@/components/Navbar";
const sizes = {
  root: "0px",
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
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
const Container = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  max-width: 800px;
  width: 100vw;
  min-width: 100%;
  flex-direction: column;
  align-items: center;

  @media ${devices.root} {
    margin-top: 150px;
    margin-bottom: 150px;
  }
  @media ${devices.laptop} {
    margin-top: 250px;
  }
`;

const Button_Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
`;
const Brand_name = styled.h1`
  font-family: Montserrat;
  text-decoration: underline;
  font-weight: 400;
  line-height: 117px;
  letter-spacing: 0em;
  text-align: left;
  @media ${devices.root} {
    font-size: 48px;
  }
  @media ${devices.tablet} {
    font-size: 96px;
  }
`;
const CTA = styled.p`
  font-family: Montserrat;

  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  max-width:700px;
  @media ${devices.root} {
    font-size: 24px;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eee;
  }
`;
const Iframe = styled.iframe`
  @media ${devices.root} {
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
  const [showHeader, setShowHeader] = useState<boolean>(true);
  useMemo(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID || "");
    // Send pageview with a custom path
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Moikas",
    });
  }, [process.env.GA_TRACKING_ID]);
  return (
    <Main>
      <Navbar />
      {loading && (
        <Container>
          {showHeader && (
            <Header>
              {" "}
              <Brand_name>MOIKAS</Brand_name>
              <CTA>
                Explore the Edge of AI! Gain the latest insights and join the
                forefront of tech pioneers. Lead the conversation today!
              </CTA>
            </Header>
          )}
          {/* <Button onClick={() => setShowRSSFeed(!showRSSFeed)}>Toggle</Button> */}

          <TwitchStream
            onComplete={(e: boolean): void => {
              setShowHeader(!e);
            }}
          />
          <Iframe
            src="https://embeds.beehiiv.com/da38b479-5278-4c4f-92da-65fd877960bf?slim=true"
            data-test-id="beehiiv-embed"
            height="52"
            width="500"
            frameBorder="0"
            scrolling="no"
          ></Iframe>
          {/* Conditional rendering based on showRSSFeed state */}
          {showRSSFeed && (
            <RSSFeed
              title="Latest"
              urls={[
                "https://rss.beehiiv.com/feeds/lZKp0ZrfNi.xml",
                "https://www.youtube.com/feeds/videos.xml?channel_id=UCIjgVUuzx_H0ZrUK-6J_QiQ",
                "https://www.etsy.com/shop/moikaslookout/rss",
              ]}
              onComplete={() => setLoading(true)}
            />
          )}
        </Container>
      )}
    </Main>
  );
}
