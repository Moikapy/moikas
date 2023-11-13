'use client';
import styled from 'styled-components';
import {useCallback, useEffect, useState} from 'react';
import {
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
const Form_widget = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 18.75rem;
  width: 100%;
  background-color: #fff;
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
const Loading_widget = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 18.75rem;
  width: 100%;
  height: 100%;
  position: relative;
  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;
const Email_Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #000;
  margin-bottom: 0.5rem;
  & > label {
    margin-bottom: 0.25rem;
  }
  & > input {
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #000;
    padding: 0.5rem;
    background-color: #eee;
  }
`;
const Name_Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #000;
  margin-bottom: 0.5rem;
  & > label {
    margin-bottom: 0.25rem;
  }
  & > input {
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #000;
    padding: 0.5rem;
    background-color: #eee;
  }
`;
const Username_Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #000;
  margin-bottom: 0.5rem;
  & > label {
    margin-bottom: 0.25rem;
  }
  & > input {
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #000;
    padding: 0.5rem;
    background-color: #eee;
  }
`;
const Website_Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #000;
  margin-bottom: 0.5rem;
  & > label {
    margin-bottom: 0.25rem;
  }
  & > input {
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #000;
    padding: 0.5rem;
    background-color: #eee;
  }
`;
const Avatar_Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Button_Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  & button {
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #000;
    padding: 0.5rem;
    background-color: #eee;
  }
  & button:hover {
    background-color: #fff;
  }
`;
const AccountForm = ({session}: {session: Session | null}): any => {
  const supabase = createClientComponentClient<any>();
  const [loading, setLoading] = useState(true); // [1
  const [error, setError] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [user_name, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async() => {
    try {
      setLoading(true);

      const {data, error, status}: any = supabase
        .from('users')
        .select(`name, user_name`)
        .eq('user_id', user?.id)
        .single();
      console.log(data, error, status);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.name);
        setUsername(data.user_name);
        // setWebsite(data.website);
        // setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      console.error('Error loading user data!', error.message);
      // setError(true);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    console.log('useEffect');
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

  return !loading ? (
    <Form_widget>
      <Email_Section>
        <label htmlFor='email'>Email:</label>
        <input id='email' type='text' value={session?.user.email} disabled />
      </Email_Section>
      <Name_Section>
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          type='text'
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </Name_Section>
      <Username_Section>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={user_name || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Username_Section>
      <Website_Section>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='url'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Website_Section>

      <Button_Section>
        <button
          className='button primary block'
          onClick={() =>
            updateProfile({fullname, user_name, website, avatar_url})
          }
          disabled={loading}>
          {'Update'}
        </button>

        <form action='/auth/signout' method='post'>
          <button className='button block' type='submit'>
            Sign out
          </button>
        </form>
      </Button_Section>
    </Form_widget>
  ) : (
    <Loading_widget>
      <span>Loading...</span>
    </Loading_widget>
  );
};
export default AccountForm;
