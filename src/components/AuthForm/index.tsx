'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {Auth} from '@supabase/auth-ui-react';


export default function AuthForm() {
  const supabase = createClientComponentClient<any>()
  return (
    <Auth
      supabaseClient={supabase}
      showLinks={false}
      providers={[]}
      redirectTo='http://localhost:3000/auth/callback'
    />
  );
}