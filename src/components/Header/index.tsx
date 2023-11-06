import styled from 'styled-components';
import {sizes, devices} from '@/styles/index';

const _Header = styled.div`
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
  padding: 0 15px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
  max-width: 700px;
  @media ${devices.root} {
    font-size: 24px;
  }
`;

export default function Header() {
  return (
    <_Header>
      {' '}
      <Brand_name>MOIKAS</Brand_name>
      <CTA>Gain the latest insights and discoveries in AI.</CTA>
    </_Header>
  );
}
