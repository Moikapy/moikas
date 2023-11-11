import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import styled from 'styled-components';
import AccountForm from '@/components/AccountForm';
// const Main = styled.main`
//   /* Add your main styles here if any */
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-family: Montserrat, sans-serif;
// `;

export default async function Account() {

  const supabase = createServerComponentClient<any>({cookies});

  const {
    data: {session},
  } = await supabase.auth.getSession();
  return <AccountForm session={session} />;
}
