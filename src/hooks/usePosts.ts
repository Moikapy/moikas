import {useState} from 'react';
// import {Database} from '@/types/database.types';
import {useSupabaseClient, useUser} from '@supabase/auth-helpers-react';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
// import {Post} from '@/types/Post';

const usePosts = (session?: any) => {
  // Retrieve Supabase client and user from context
  const supabase = createClientComponentClient();

  // Initialize posts state
  const [posts, setPosts] = useState<any[]>([]);
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
    setPosts(data || []);
  };

  // Create a new post in the database
  const createPost = async ({
    title,
    sub_title,
    content,
  }: {
    title: string;
    sub_title: string;
    content: any[];
  }) => {
    const user = session.user;
    if (!user) throw new Error('User not found');

    // Fetch the profile ID associated with the user ID
    const profileResponse = await supabase
      .from('users')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileResponse.error) throw new Error('Profile not found');

    // Extract profile_id from the response
    const profileId = profileResponse.data.id;

    // Now insert the new post with the profile_id
    const {data, error} = await supabase
      .from('posts')
      .insert({
        title,
        sub_title,
        content,
        author: profileId, // Save the profile_id as the author
      })
      .select('*')
      .single();

    if (error) throw error;

    return data;
    setPosts(data || []);
  };

  // Update an existing post in the database
  const updatePost = async ({
    id,
    title,
    sub_title,
    content,
  }: {
    id: string;
    title: string;
    sub_title: string;
    content: any[];
  }) => {
    const {data, error} = await supabase
      .from('posts')
      .update({
        title,
        sub_title,
        content,
      })
      .match({id})
      .select()
      .single();
    if (error) throw error;
    setPosts(data || []);
    return data;
  };

  const deletePost = async (id: string) => {
    const {error} = await supabase.from('posts').delete().match({id});
    if (error) throw error;
    setPosts(posts.filter((p) => p.id !== id));
  };

  return {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    posts,
  };
};

export default usePosts;
// Retrieve posts from the database
export const getPostById = async (id: string) => {
  const supabase = createClientComponentClient();
  const {data, error} = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};
