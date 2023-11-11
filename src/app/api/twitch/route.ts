// app/api/rss/route.ts

import {type NextRequest} from 'next/server';

// async function checkIfLive(username: string) {
//   try {
//     const response = await fetch(`https://twitch.tv/${username}`);
//     const sourceCode = await response.text();

//     if (sourceCode.includes('isLiveBroadcast')) {
//       console.log(`${username} is live`);
//     } else {
//       console.log(`${username} is not live`);
//     }
//   } catch (error) {
//     console.log('Error occurred:', error);
//   }
// }
export async function GET(request: NextRequest) {
  let accessToken = process.env.ACCESS_TOKEN || '';

  // Validate the access token
  const validationResponse = await fetch(
    'https://id.twitch.tv/oauth2/validate',
    {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    }
  );

  if (!validationResponse.ok) {
    // If validation fails, refresh the access token
    const tokenResponse = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST',
      }
    );
    const tokenData = await tokenResponse.json();
    accessToken = tokenData.access_token;
  }
  const response = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${process.env.TWITCH_CHANNEL_NAME}&type=live`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID || '',
        Authorization: `Bearer ${accessToken || ''}`, // Replace with your OAuth token
      },
    }
  );
  const data = await response.json();

  try {
    // console.log(data)
    // checkIfLive('moikapy');
    return new Response(JSON.stringify(data), {status: 200});
  } catch (error: any) {
    console.error('Error parsing RSS feed:', error.message);
    return new Response(
      JSON.stringify({error: `Unable to fetch RSS feed: ${error.message}`}),
      {status: 500}
    );
  }
}
