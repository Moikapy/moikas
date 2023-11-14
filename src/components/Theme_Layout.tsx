'use client';
import {ReactNode} from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
const Main = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
export default function Theme_Layout({children}: {children: ReactNode}) {
  return (
    <Main>
      <Navbar />
      {children}
    </Main>
  );
}
