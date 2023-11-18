'use client';
import Theme_Layout from '@/components/Theme_Layout';
import H from '@/components/common/H';
import {DateTime} from 'luxon';
import styled from 'styled-components';
const Page_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  max-width: 600px;
  padding: 7rem 2rem;
  background: #fcf5e5;

  @media (max-width: 611px) {
    height: 100%;
  }
  @media (min-width: 612px) {
    border: 1px solid #000;
    border-radius: 16px;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.25);
    background: #fff;
    margin: 5rem auto;
    padding: 2rem;
  }
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 16px;

  padding: 0.5rem;
  @media (min-width: 612px) {
    background: #fff;
  }
`;

export default function Post_Page_View({
  post,
}: {
  post: {title: string; sub_title: string; content: any[]; created_at: string};
}) {
  return (
    <Theme_Layout>
      <Page_Wrapper>
        <H className='m-0'>{post?.title}</H>
        <H type='5' className='m-0 text-italics'>
          {post?.sub_title}
        </H>
        <H type='6' className='mb-5'>
          {DateTime.fromISO(post.created_at || '').toFormat('FF ZZ')}
        </H>
        <Text_Block_Renderer blocks={post?.content} />
        <Button onClick={() => (window.location.href = '/blog')}>
          View More Posts
        </Button>
      </Page_Wrapper>
    </Theme_Layout>
  );
}

function Text_Block_Renderer({blocks}: any): any {
  // console.log(blocks.type)
  const renderBlock = (block: any): any => {
    if (block.type === 'header')
      return <H type={block.data.level}>{block.data.text}</H>;
    if (block.type === 'paragraph') {
      if (block?.content?.length === 0 && block?.children?.length === 0) {
        return <br />;
      } else if (block?.content?.length === 0 && block?.children?.length > 0) {
        return block?.children.map(renderBlock);
      }
      return block?.content.map((content: any) => {
        if (content.type === 'text') return <p>{content?.text}</p>;
        if (content.type === 'linkTool')
          return <a href={content?.link}>{content?.link}</a>;
      });
    }
  };
  return blocks.map(renderBlock);
}
