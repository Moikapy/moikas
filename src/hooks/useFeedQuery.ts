'use client';
import {useMemo, useState} from 'react';
export interface FeedItem {
  title: string;
  link: string;
  contentSnippet: string;
  pubDate: string;
}
export default function useFeedQuery(urls: string[], onComplete: Function) {
  const [feed, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copyrights, setCopyrights] = useState<string[]>([]);
  const fetchRSSFeed = async (url: string) => {
    try {
      const response = await fetch(`/api/rss?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };
  const data: any =
    useMemo(async () => {
      const fetchAllFeeds = async () => {
        const allFeedItems: FeedItem[][] = [];
        const allCopyrights: string[] = [];

        for (const url of urls) {
          const data = await fetchRSSFeed(url);
          if (data) {
            allFeedItems.push(data.items as FeedItem[]);
            copyrights.push(data.copyright);
          }
        }
        const items = allFeedItems
          .flat()
          .sort(
            (a, b) =>
              new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
          );

        setFeedItems(items);
        setCopyrights(allCopyrights);
        setLoading(false);
        return {items, copyrights};
      };
      const feedItems = await fetchAllFeeds();
      await onComplete();
      return feedItems;
    }, [urls]) || [];

  return {feed, copyrights, loading};
}
