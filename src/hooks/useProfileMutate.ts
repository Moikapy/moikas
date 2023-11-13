import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

export default async function useProfileMutate() {
  const supabase = createClientComponentClient<any>();
  return {
    updateProfile: async ({
      id,
      name,
      user_name,
      website,
      avatar_url,
    }: {
      id: string | null;
      name: string | null;
      user_name: string | null;
      fullname: string | null;
      website?: string | null;
      avatar_url?: string | null;
    }) => {
      try {
        const {error} = await supabase
          .from('users')
          .update({
            user_id: id as string,
            name: name,
            user_name: user_name,
            // website,
            // avatar_url,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', id);
        if (error) throw error;
        console.log('Profile updated!');
      } catch (error) {
        console.error('Error updating the data!');
      }
    },
  };
}
