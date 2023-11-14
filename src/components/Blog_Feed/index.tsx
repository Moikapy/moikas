'use client';
// src/components/Blog_Feed.tsx
import ReactGA from 'react-ga4';
import React, {useState, useMemo, useContext} from 'react';
import Container from '../container'; // Adjust the path based on your directory structure
import {truncate} from '@/lib/utils';
import {Data_Context} from '@/components/Data_Provider';
import styled from 'styled-components';
import {DateTime} from 'luxon';
import styles from '../../styles/RSSFeed.module.css';
import Link from 'next/link';
import H from '../common/H';
import {FeedItem} from '@/hooks/useFeedQuery';
const Feed = styled.div<{$isCard: boolean}>`
  font-family: 'Montserrat', sans-serif;
  max-width: ${(props) => (props.$isCard ? '100%' : '800px')};
  width: 100%;
  margin: 0 0.5rem;
  height: 100%;
  text-align: center;
  
`;

const Feed_Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: start;
  flex-wrap: wrap;
`;
const Blog_Feed: React.FC<{
  items: any[];
  isCard?: boolean;
  isEdit?: boolean;
  onComplete?: Function;
  onClick?: Function;
}> = ({
  items,
  onComplete = () => {},
  isCard = false,
  isEdit = false,
  onClick = () => {},
}) => {
  if (false)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  return (
    <Feed $isCard={isCard}>
   
        <Feed_Content>
          {items.map((item: FeedItem, idx) =>
            !isCard ? (
              <Blog_Fist_Item item={item} key={idx} />
            ) : (
              <Blog_Card_Item
                item={item}
                key={idx}
                onClick={onClick}
                isEdit={isEdit}
              />
            )
          )}
        </Feed_Content>
     
    </Feed>
  );
};

export default Blog_Feed;

function Blog_Fist_Item({item}: {item: any}) {
  // const {ReactGA}: any = useContext(Data_Context);
  return (
    <div
      className={styles.feedContainer}
      onClick={() => {
        // Send a custom event

        ReactGA.event({
          category: 'Blog_Feed',
          action: 'clicked',
          label: item.title,
        });
      }}>
      <div className={styles.feedItem}>
        <h2 className={styles.feedTitle}>
          <a
            href={item.link ? item.link : ''}
            target='_blank'
            rel='noopener noreferrer'>
            {item.title}
          </a>
        </h2>
        <p className={styles.feedSnippet}>
          {item.contentSnippet && truncate(item.contentSnippet || '', 280)}
        </p>
        <p className={styles.feedSnippet}>
          {item.pubDate && DateTime.fromRFC2822(item.pubDate).toFormat('FF ZZ')}
        </p>
      </div>
    </div>
  );
}

const Card = styled.div`
  position: relative;
  text-align: left;
  flex-shrink: 0;
  padding: 0 20px 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #eee;
  }
  border: 1px solid #eee;
  min-width: 300px;
  width: 100%;
`;
const Card_Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Text_section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Tag = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 25px;
  margin: 0;
  padding: 5px 10px;
  border-radius: 0 0 0 10px;
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;
const Date = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 25px;
  margin: 0;
  padding: 5px 10px;
  border-radius: 0 0 10px 0;
  background-color: #000;
  border: 1px solid #000;
  color: #fff;
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
`;
function Blog_Card_Item({
  item,
  onClick,
  isEdit = false,
}: {
  item: any;
  onClick: Function;

  isEdit?: boolean;
}) {
  // const {ReactGA}: any = useContext(Data_Context);

  return (
    <Card
      title={truncate(item.contentSnippet || '', 140)}
      className='col-12 col-md-6 col-lg-3 w-100'
      onClick={() => {
        // Send a custom event=
        ReactGA.event({
          category: 'Blog_Feed',
          action: 'clicked',
          label: item.title,
        });
        onClick(item);
      }}>
      <Link
        href={isEdit ? '' : '/blog/' + item.id}
        prefetch={true}
        target='_self'>
        <Card_Content className={styles.feedItem}>
          <Text_section>
            <h2 className={`${styles.feedTitle} text-truncate`}>
              {item.title}
            </h2>
            <p className={`${styles.feedSnippet} text-truncate`}>
              {item.contentSnippet && truncate(item.contentSnippet, 140)}
            </p>
          </Text_section>
          <Tag>{item?.users?.user_name ? item.users.user_name : ''}</Tag>
          <Date>{DateTime.fromISO(item.created_at).toFormat('FF ZZ')}</Date>
        </Card_Content>
      </Link>
    </Card>
  );
}
