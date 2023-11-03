// components/TwitchStream.tsx

import React, { useState, useMemo, useRef, RefObject } from "react";
import styled from "styled-components";

// Extend the Window interface to include Twitch
declare global {
  interface Window {
    Twitch: any;
  }
}

const StreamContainer = styled.div`
  /* Add your styles here */
  width: 100%;
  height:100vw;
  max-height: 800px;
`;

interface Props {
  channelName: string;
  clientId: string; // Your Twitch Client ID
}

const TwitchStream = ({
  onComplete = (e: any) => {},
}: {
  onComplete?: (e: any) => void;
}) => {
  const [isLive, setIsLive] = useState(false);

  useMemo(() => {
    const checkStreamStatus = async () => {
      try {
        const response = await fetch(`/api/twitch`);
        const data = await response.json();
        setIsLive(data.data && data.data.length > 0);
        onComplete(data.data && data.data.length > 0);
      } catch (error) {
        console.error("Error fetching Twitch stream status:", error);
      }
    };

    checkStreamStatus();
    const interval = setInterval(checkStreamStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  if (!isLive) return null;

  return <StreamContainer>{isLive && <TwitchEmbedVideo />}</StreamContainer>;
};

export default TwitchStream;

const TwitchEmbedVideo = ({ ...props }: any) => {
  const embedRef = useRef<any | null>(null);
  const scriptRef = useRef(null);
  useMemo(() => {
    // Load the Twitch embed script
    if (!scriptRef.current) {
      const script = document.createElement("script");
      script.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
      script.addEventListener("load", () => {
        // window.Twitch = window.Twitch as typeof Twitch;
        // Create the embed instance once the script is loaded
        if (
          embedRef &&
          embedRef.current &&
          embedRef.current.childNodes.length <= 0
        ) {
         
          new window.Twitch.Embed(embedRef.current, {
            ...props,
            channel: process.env.TWITCH_CHANNEL_NAME,
            autoplay: true,
            height: "100%",
            width: "100%",
            parent: ["moikas.com"],
          });
        }
      });

      document.body.appendChild(script);
      console.log(embedRef);
    }
    if (embedRef.current) {
      // Cleanup function to remove the iframe
      while (embedRef.current.childNodes.length > 1) {
        embedRef.current.removeChild(embedRef.current.lastChild);
      }
    }
    return () => {
      if (embedRef.current) {
        // Remove the iframe or the div containing the iframe
        while (embedRef.current.firstChild) {
          embedRef.current.removeChild(embedRef.current.firstChild);
        }
      }
    };
  }, []);

  return <StreamContainer ref={embedRef} />;
};
