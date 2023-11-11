'use client';
import styled from 'styled-components';
import AccountForm from '@/components/AccountForm';
import Navbar from '@/components/Navbar';
const Main = styled.main`
  /* Add your main styles here if any */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Montserrat, sans-serif;
`;

export default async function Profile({session}: any) {
  return (
    <Main>
      <Navbar />
      <AccountForm session={session} />
    </Main>
  );
}
