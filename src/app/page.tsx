import _Home from '@/views/Home';

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
export default async function Home() {
  const {
    props: {isLive},
  } = await getData();
  const supabase = createServerComponentClient<any>({cookies});
  const {
    data: {session},
  } = await supabase.auth.getSession();

  return <_Home session={session} isLive={(await isLive) || false} />;
}
export const getData = async () => {
  const checkStreamStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/twitch`, {
        next: {revalidate: 60},
      });
      const data = await response.json();

      return data.data && (await data.data.length) > 0;
    } catch (error) {
      console.error('Error fetching Twitch stream status:', error);
    }
  };

  return {props: {isLive: checkStreamStatus()}};
};
