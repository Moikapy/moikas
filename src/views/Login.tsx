'use client';
import {useMemo} from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga4';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';

const Main = styled.main`
  /* Add your main styles here if any */
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Login_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 18.75rem;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid #000;
  box-shadow: 0 0 10px #000;

  margin-top: 6rem;
  padding: 1rem;
  max-width: 500px;
  & > div {
    width: 100%;
  }
`;

export default function Login() {
  useMemo(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID || '');
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: '/login',
      title: 'Moikas',
    });
  }, [process.env.GA_TRACKING_ID]);

  return (
    <Main>
      <Navbar />
      <Login_Container className=''>
        Login
        <AuthForm />
      </Login_Container>
    </Main>
  );
}
