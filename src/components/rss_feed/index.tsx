'use client';
// src/components/RSSFeed.tsx

import React, {useState, useMemo, useContext} from 'react';
import Container from '../container';
import styles from '../../styles/RSSFeed.module.css'; // Adjust the path based on your directory structure
import {truncate} from '@/lib/utils';
import {Data_Context} from '@/components/Data_Provider';
import styled from 'styled-components';
import {DateTime} from 'luxon';
import Link from 'next/link';
import H from '../common/H';
import getFeedItems, {FeedItem} from '@/hooks/getFeedItems';

const RSSFeed: React.FC<{
  title: string;
  urls: string[];
  isCard?: boolean;
  onComplete?: Function;
}> = ({title, urls, onComplete = () => {}, isCard = false}) => {
  const {ReactGA}: any = useContext(Data_Context);


  const {feed, copyrights, loading} = getFeedItems(urls, onComplete);

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  const Feed = styled.div`
    font-family: 'Montserrat', sans-serif;
    max-width: ${isCard ? '100%' : '800px'};
    margin: 0 0.5rem;
    padding: 20px;
    height: 100%;
    text-align: center;
  `;

  const Feed_Content = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    flex-direction: ${isCard ? 'row' : 'column'};
    justify-content: space-around;

    flex-wrap: wrap;
  `;

  return (
    <Feed>
      <H type='3' className=''>
        {title}
      </H>
      <>
        <Feed_Content>
          {feed.map((item: FeedItem, idx) =>
            !isCard ? (
              <RSS_List_Item item={item} key={idx} />
            ) : (
              <RSS_Card_Item item={item} key={idx} />
            )
          )}
        </Feed_Content>
      </>
      <hr />
      <br />
      {(copyrights && copyrights[0]) || ''}
    </Feed>
  );
};

export default RSSFeed;

function RSS_List_Item({item}: {item: any}) {
    const {ReactGA}: any = useContext(Data_Context);
  return (
    <div
      className={styles.feedContainer}
      onClick={() => {
        // Send a custom event

        ReactGA.event({
          category: 'rss_feed',
          action: 'clicked',
          label: item.title,
        });
      }}>
      <div className={styles.feedItem}>
        <h2 className={styles.feedTitle}>
          <a href={item.link} target='_blank' rel='noopener noreferrer'>
            {item.title}
          </a>
        </h2>
        <p className={styles.feedSnippet}>
          {truncate(item.contentSnippet || '', 280)}
        </p>
        <p className={styles.feedSnippet}>
          {DateTime.fromRFC2822(item.pubDate).toFormat('FF ZZ')}
        </p>
      </div>
    </div>
  );
}
function RSS_Card_Item({item}: {item: any}) {
    const {ReactGA}: any = useContext(Data_Context);
  const Card = styled.div`
    position: relative;
    text-align: left;
    flex-shrink: 0;
    margin: 0.5rem 0.5rem 3rem;
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
    height:25px;
    margin:0;
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

  return (
    <Card
      title={truncate(item.contentSnippet || '', 140)}
      className='col-12 col-md-6 col-lg-3'
      onClick={() => {
        // Send a custom event=
        ReactGA.event({
          category: 'rss_feed',
          action: 'clicked',
          label: item.title,
        });
      }}>
      <Link href={item.link} prefetch={true} target='_blank'>
        <Card_Content className={styles.feedItem}>
          <Text_section>
            <h2 className={`${styles.feedTitle} text-truncate`}>
              {item.title}
            </h2>
            <p className={`${styles.feedSnippet} text-truncate`}>
              {truncate(item.contentSnippet || '', 140)}
            </p>
          </Text_section>
          <Tag>
            {item.creator == 'Moikapy'
              ? 'Blog'
              : item.author == 'Moikapy TV'
              ? 'Video'
              : 'Store'}
          </Tag>
          <Date>
            {item.author !== 'Moikapy TV'
              ? DateTime.fromRFC2822(
                  item.pubDate || item.published || ''
                ).toFormat('FF ZZ')
              : DateTime.fromISO(item.pubDate || item.published || '').toFormat(
                  'FF ZZ'
                )}
          </Date>
        </Card_Content>
      </Link>
    </Card>
  );
}
