'use client';
// src/components/RSSFeed.tsx

import React, {useState, useEffect, useMemo} from 'react';
import Container from './container';
import * as styles from '../styles/RSSFeed.module.css'; // Adjust the path based on your directory structure
import { truncate } from '@/lib/utils';

interface FeedItem {
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
}

const RSSFeed: React.FC<{
  title: string;
  urls: string[];
  onComplete?: Function;
}> = ({title, urls, onComplete = () => {}}) => {
  const [feedItems, setFeedItems] = useState<FeedItem[][]>([]);
  const [loading, setLoading] = useState(true);
  const [copyrights, setCopyrights] = useState<string[]>([]);

  useMemo(() => {
    const fetchRSSFeed = async (url: string) => {
      try {
        const response = await fetch(`/api/rss?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return null;
      }
    };

    const fetchAllFeeds = async () => {
      const allFeedItems: FeedItem[][] = [];
      const allCopyrights: string[] = [];

      for (const url of urls) {
        const data = await fetchRSSFeed(url);
        if (data) {
          allFeedItems.push(data.items as FeedItem[]);
          allCopyrights.push(data.copyright);
        }
      }

      setFeedItems(allFeedItems);
      setCopyrights(allCopyrights);
      setLoading(false);
      await onComplete();
    };

    fetchAllFeeds();
  }, [urls]);

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  return (
    <div className={styles.feed}>
      <p>{title}</p>
      {feedItems
        .flat()
        .sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        )
        .map((item, idx) => (
          <div key={idx} className={styles.feedContainer}>
            <div className={styles.feedItem}>
              <h2 className={styles.feedTitle}>
                <a href={item.link} target='_blank' rel='noopener noreferrer'>
                  {item.title}
                </a>
              </h2>
              <p className={styles.feedSnippet}>
                {truncate(item.contentSnippet||'',280)}
              </p>
              <p className={styles.feedSnippet}>{item.pubDate}</p>
            </div>
          </div>
        ))}{' '}
      <hr />
      <br />
      {copyrights[0] || ''}
    </div>
  );
};

export default RSSFeed;
