'use client';
import {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga4';
import Navbar from '@/components/Navbar';
import Blog_Feed from '@/components/Blog_Feed';

import usePostsQuery from '@/hooks/usePosts';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import Theme_Layout from '@/components/Theme_Layout';


export default function Blog() {
  const {posts, getPosts} = usePostsQuery();

  useMemo(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID || '');
    // Send pageview with a custom path
    ReactGA.send({
      hitType: 'pageview',
      page: '/blog',
      title: 'Moikas | Blog',
    });
    getPosts();
  }, [process.env.GA_TRACKING_ID]);

  return (
    <Theme_Layout>
      <br/>
      <Blog_Feed items={posts} isCard={true} />
    </Theme_Layout>
  );
}
