import Login from '@/views/Login';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {supabase} from '@supabase/auth-ui-shared';
import {cookies} from 'next/headers';

export default async function Page() {
  const supabase = createServerComponentClient<any>({cookies});
  const {
    data: {session},
  } = await supabase.auth.getSession();

  return <Login session={session} />;
}
