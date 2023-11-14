import Post_Page_View from '@/views/Post_Page_View';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
// --- src/pages/posts/[id].tsx ---
// const Main = styled.main`
//   /* Add your main styles here if any */
//   height: 100%;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: start;
//   min-width: 18.75rem;
//   width: 100%;
//   border-radius: 1rem;
//   border: 1px solid #000;
//   box-shadow: 0 0 10px #000;

//   margin-top: 6rem;
//   padding: 1rem;
//   max-width: 500px;
//   & > div {
//     width: 100%;
//   }
// `;

const Page = async ({params}: any) => {
  const {
    props: {post},
  }: any = await getData(params);

  return <Post_Page_View post={post} />;
};

export default Page;

export const getData = async (params: any) => {
  const supabase = createServerComponentClient({cookies}); // from '@supabase/auth-helpers-nextjs';
  const {data} = await supabase
    .from('posts')
    .select('*')
    .eq('id', params?.slug)
    .single();
  if (!data) {
    // if the post doesn't exist, return 404
    return {
      notFound: true,
    };
  }

  // return the post a prop
  return {
    props: {
      post: data,
    },
  };
};
