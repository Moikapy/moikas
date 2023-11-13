import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';

import {useCallback, useMemo, useState} from 'react';
export default function useProfileQuery(
  session: Session,
  onCompleted?: any,
  onError?: any
) {
  const user = session?.user;
  const supabase = createClientComponentClient<any>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const {data, error, status}: any = await supabase
        .from('users')
        .select(`name, user_name`)
        .eq('user_id', user?.id)
        .single();
      console.log(await data, await error, await status);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setData(data);
        onCompleted(data);
        // setFullname(data.name);
        // setUsername(data.user_name);
        // setWebsite(data.website);
        // setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      // console.error('Error loading user data!', error.message);
      onError(true);
    } finally {
      setLoading(false);
    }
  }, []);
  useMemo(() => {
    getProfile();
  }, []);

  return {
    data,
    loading,
  };
}
