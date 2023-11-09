import styled from 'styled-components';
import {sizes, devices} from '@/styles/index';
import Link from 'next/link';

const _Header = styled.div`
  display: flex;
  max-width: 800px;
  width: 100vw;
  min-width: 100%;
  flex-direction: column;
  align-items: center;

  @media ${devices.root} {
    margin-top: 150px;
    margin-bottom: 75px;
  }
  @media ${devices.laptop} {
    margin-top: 250px;
  }
`;

const Brand_name = styled.h1`
  font-family: Montserrat;
  text-decoration: underline;
  font-weight: 400;
  line-height: 117px;
  letter-spacing: 0em;
  text-align: left;
  @media ${devices.root} {
    font-size: 56px;
  }
  @media ${devices.tablet} {
    font-size: 72px;
  }
  @media ${devices.laptop} {
    font-size: 96px;
  }
`;
const CTA = styled.p`
  font-family: Montserrat;
  padding: 0 15px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  max-width: 700px;
  @media ${devices.root} {
    font-size: 16px;
  }
  @media ${devices.tablet} {
    font-size: 24px;
  }
`;

const Button = styled.button`
  margin: 1rem 5px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  background: #fff;
  text-transform: uppercase;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &:hover {
    background: #000;
    color: #fff;
  }
`;

export default function Header() {
  return (
    <_Header>
      {' '}
      <Brand_name>MOIKAS</Brand_name>
      <CTA>Stay Ahead with AI <br/>Discover the Latest Gear and Insights Here!</CTA>
      <Button>
        <Link target='_self' href={'https://moikas.com/shop'}>
          Shop
        </Link>
      </Button>
    </_Header>
  );
}
