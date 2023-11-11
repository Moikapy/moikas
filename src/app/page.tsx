import _Home from '@/components/views/Home';
export default async function Home() {
  const {
    props: {isLive},
  } = await getData();

  return <_Home isLive={(await isLive) || false} />;
}
export const getData = async () => {
  const checkStreamStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/twitch`, {
        next: {revalidate: 60},
      });
      const data = await response.json();

      return data.data && (await data.data.length) > 0;
    } catch (error) {
      console.error('Error fetching Twitch stream status:', error);
    }
  };

  return {props: {isLive: checkStreamStatus()}};
};
