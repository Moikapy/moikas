'use client';
import styled from 'styled-components';
import AccountForm from '@/components/AccountForm';
import Navbar from '@/components/Navbar';
import useProfileMutate from '@/hooks/useProfileMutate';

const Main = styled.main`
  /* Add your main styles here if any */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Montserrat, sans-serif;
`;

export default function Profile({session}: any) {
  const {updateProfile}: any = useProfileMutate();
  return (
    <Main>
      <Navbar />
      <AccountForm session={session} updateProfile={updateProfile} />
    </Main>
  );
}
