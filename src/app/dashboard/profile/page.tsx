import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Profile from '@/views/Profile';

export default async function Page() {
  const supabase = createServerComponentClient<any>({cookies});

  const {
    data: {session},
  } = await supabase.auth.getSession();
  return <Profile session={session} />;
}
