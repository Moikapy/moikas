// components/TwitchStream.tsx

import React, {useState, useMemo} from 'react';
import styled from 'styled-components';

const StreamContainer = styled.div`
  /* Add your styles here */
`;

interface Props {
  channelName: string;
  clientId: string; // Your Twitch Client ID
}

const TwitchStream: React.FC = () => {
  const [isLive, setIsLive] = useState(false);

  useMemo(() => {
    const checkStreamStatus = async () => {
      try {
        const response = await fetch(`/api/twitch`);
        const data = await response.json();
        setIsLive(data.data && data.data.length > 0);
      } catch (error) {
        console.error('Error fetching Twitch stream status:', error);
      }
    };

    checkStreamStatus();
    const interval = setInterval(checkStreamStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  if (!isLive) return null;

  return (
    <StreamContainer>
      <iframe
        src={`https://player.twitch.tv/?channel=${process.env.TWITCH_CHANNEL_NAME}`} // Replace YOUR_DOMAIN with your website domain
        height='300'
        width='500'
        allowFullScreen></iframe>
    </StreamContainer>
  );
};

export default TwitchStream;
