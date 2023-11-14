import Dashboard_View from '@/views/Dashboard';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

export default async function Page() {
  const supabase = createServerComponentClient<any>({cookies});
  const {
    data: {session},
  } = await supabase.auth.getSession();
  return <Dashboard_View session={session} />;
}
