// import {Database} from '@/types/database.types';
import {useSupabaseClient, useUser} from '@supabase/auth-helpers-react';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
// import {Post} from '@/types/Post';

const usePostsQuery = () => {
  // Retrieve Supabase client and user from context
  const supabase = createClientComponentClient();

  // Initialize posts state
  let posts: any[] = [];
  // Retrieve posts from the database
  const getPostById = async (id: string) => {
    const {data, error} = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  };

  // Retrieve posts from the database
  const getPosts = async (limit?: number) => {
    const {data, error} = await supabase
      .from('posts')
      .select('*, users(id, name, user_name,name,isCreator,bio)')
      .limit(limit || 50);
    if (error) throw error;
    posts = data || [];
  };

  return {
    getPostById,
    getPosts,
    posts,
  };
};

export default usePostsQuery;
