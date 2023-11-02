// app/api/rss/route.ts

import { type NextRequest } from 'next/server';
import Parser from 'rss-parser';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL parameter is required' }), { status: 400 });
  }

  const parser = new Parser();
  try {
    const feed = await parser.parseURL(url);
    return new Response(JSON.stringify(feed), { status: 200 });
  } catch (error:any) {
    console.error("Error parsing RSS feed:", error.message);
    return new Response(JSON.stringify({ error: `Unable to fetch RSS feed: ${error.message}` }), { status: 500 });
  }
}