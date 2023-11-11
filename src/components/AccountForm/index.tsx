'use client';
import {useCallback, useEffect, useState} from 'react';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';

 const AccountForm = ({session}: {session: Session | null}):any =>{
  const supabase = createClientComponentClient<any>();
  const [loading, setLoading] = useState(true); // [1
  const [fullname, setFullname] = useState<string | null>(null);
  const [user_name, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const {data, error, status}:any = await supabase
        .from('users')
        .select(`name, user_name`)
        .eq('user_id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.name);
        setUsername(data.user_name);
        // setWebsite(data.website);
        // setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      // alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    user_name,
    website,
    avatar_url,
  }: {
    user_name: string | null;
    fullname: string | null;
    website?: string | null;
    avatar_url?: string | null;
  }) {
    try {
      setLoading(true);

      const {error} = await supabase
        .from('users')
        .update({
          user_id: user?.id as string,
          name: fullname,
          user_name: user_name,
          // website,
          // avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user?.id);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='form-widget'>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          type='text'
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={user_name || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='url'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className='button primary block'
          onClick={() =>
            updateProfile({fullname, user_name, website, avatar_url})
          }
          disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action='/auth/signout' method='post'>
          <button className='button block' type='submit'>
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
