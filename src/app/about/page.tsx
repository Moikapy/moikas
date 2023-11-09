'use client';
import {useMemo, useState} from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga4';
import Navbar from '@/components/Navbar';
import H from '@/components/common/H';
import { devices } from '@/styles';

const Main = styled.main`
  /* Add your main styles here if any */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Montserrat, sans-serif;
`;

// Styled components
const AboutSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;

  align-self: center;
  flex-direction: column;
  @media ${devices.laptop} {
    padding: 20px;
    margin-top: 4rem;
    flex-direction: row;
  }
`;

const CarouselContainer = styled.div`
  border-radius: 1rem;
  background: #000;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const _Image = styled.img`
  aspect-ratio: 1 / 1;
  object-fit: fill;
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  @media ${devices.root} {
    margin: 0 auto;
    max-width: 325px;
  }
  @media ${devices.tablet} {
    width: 100%;
    min-width: 425px;
    max-width: 550px;
  }
`;

const QuoteAndSkillsContainer = styled.div`
  margin: 20px;
  padding: 1rem;
  display: flex;
  justify-content: around;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 550px;
   @media ${devices.laptop} {
    padding-left: 40px;
  }
`;

const Text = styled.p`
  margin: 0 0 1rem;
`;
const Accent = styled.span`
  color: #75538d;
  font-weight: 700;
`;

const SkillsList = styled.ul`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  padding-top: 2rem;
  border-top: 1px solid #000;
`;

const SkillItem = styled.li`
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 12px;
  font-weight: 600;
  color: #000;
  background: #fff;
  text-transform: uppercase;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
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
    'profile_002.jpeg',
    // ... more images
  ];

  const text =
    'You Are The Average Of The Five People You Spend The Most Time With';
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Rust',
    'Python',
    'React',
    'NextJS',
    'MongoDB',
    'GraphQL',
    'Apollo',
    'Styled-Components',
  ];

  return (
    <Main>
      <Navbar />

      <AboutSectionContainer title='Click Me!'>
        <Carousel images={images} />
        <QuoteAndSkillsContainer>
          <H className='' type='1'>
            Hey, I’m <Accent>Warren Gates</Accent>!
          </H>
          <H type='4'>The Founder of Moikas</H>
          <Text>Full-Stack Developer x Aiprenuer x Twitch Streamer</Text>
          <Text>
            Implementinig AI into new and existing tools to be
            used for content creation, documenting the processes, and creating Guides to follow along.{' '}
          </Text>
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
const Carousel: React.FC<{images: string[]}> = ({images}) => {
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
