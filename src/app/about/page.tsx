'use client';
import Image from 'next/image';
import RSSFeed from '@/components/rss_feed';
import {useMemo, useState} from 'react';
import styled from 'styled-components';
import styles from './page.module.css';
import TwitchStream from '@/components/TwitchStream';
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

// Styled components
const AboutSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  
  flex-direction: column;
  @media ${devices.tablet} {
    padding: 20px;
    flex-direction: row;
    height: 100%;
  }
`;

const CarouselContainer = styled.div`
  width: 70%;
  border-radius: 100%;
  background: #000;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

`;

const _Image = styled.img`
  width: 85%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  border-radius: 50%;
  
  @media ${devices.root} {
    margin: 0 auto;
    max-width: 425px;
  }
`;

const QuoteAndSkillsContainer = styled.div`
  width: 50%;
  margin-top: 20px;
  @media ${devices.tablet} {
    padding-left: 40px;
  }
`;

const Quote = styled.p`
  font-style: italic;
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  margin: 5px 0;
`;

export default function About() {
  useMemo(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID || '');
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: '/about',
      title: 'Moikas',
    });
  }, [process.env.GA_TRACKING_ID]);
    const images = [
      'profile_001.png',
      // ... more images
    ];

    const quote =
      'You Are The Average Of The Five People You Spend The Most Time With';
    const skills = [
      'JavaScript',
      'TypeScript',
      'React',
      'Styled-Components',
      'Node.js',
      'NextJS',
      'MongoDB',
      'GraphQL',
      'Apollo',
      'Rust',

    ];

  return (
    <Main>
      <Navbar />

      <AboutSectionContainer>
        <Carousel images={images} />
        <QuoteAndSkillsContainer>
          <Quote>{quote}</Quote>
          <hr/>
          <SkillsList>
            {skills.map((skill, index) => (
              <SkillItem key={index}>{skill}</SkillItem>
            ))}
          </SkillsList>
        </QuoteAndSkillsContainer>
      </AboutSectionContainer>
    </Main>
  );
}
// Props interfaces
interface AboutSectionProps {
  images: string[];
  quote: string;
  skills: string[];
}
// Carousel component
const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <CarouselContainer onClick={goToNext}>
      <_Image src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
    </CarouselContainer>
  );
};